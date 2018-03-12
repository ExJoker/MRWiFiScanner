using System;
using Moulin.DDP;
using UnityEngine;
#if WINDOWS_UWP
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Windows.Devices.WiFi;
using Windows.Devices.Enumeration;
#endif

// get all ssids of all available WiFi networks
// roughly based on https://www.oshyn.com/Blogs/2016/October/Accessing-Hololens-Wifi-Adapter


public class WiFiScan : MonoBehaviour {
    // communication to send received APs to server
    private Communication com;
    private string guid = null;

    private void SendWifiLocation(JSONObject networks)
    {
        if (guid == null)
        {
            CreateScan();
        }
        MethodCall call = com.Call("wifilocation.add",
            JSONObject.CreateStringObject(guid),
            Vector3ToJSON(Camera.main.transform.position),
            networks);
    }

    private void CreateScan()
    {
        guid = System.Guid.NewGuid().ToString();
        MethodCall call = com.Call("wifiscan.add",
            JSONObject.CreateStringObject(guid));
    }

    private JSONObject Vector3ToJSON(Vector3 position)
    {
        JSONObject jsonPosition = new JSONObject(JSONObject.Type.ARRAY);
        jsonPosition.Add(position.x);
        jsonPosition.Add(position.y);
        jsonPosition.Add(position.z);
        return jsonPosition;
    }


#if WINDOWS_UWP
    private WiFiAdapter adapter;
    private bool ready = true;

    private void GenerateNetworkReport(WiFiNetworkReport report) {
        JSONObject networks = new JSONObject(JSONObject.Type.ARRAY);
        foreach (var network in report.AvailableNetworks)
        {
            JSONObject jsonNetwork = new JSONObject();
            jsonNetwork.AddField("ssid", (string)network.Ssid);
            jsonNetwork.AddField("db", (float)network.NetworkRssiInDecibelMilliwatts);
            jsonNetwork.AddField("mac", (string)network.Bssid);
            networks.Add(jsonNetwork);
            /* 
            network.Add(string.Format("SSID: {0} -- SignalBars: {1} -- Db: {2} -- Mac: {3}", 
network.Ssid, network.SignalBars, network.NetworkRssiInDecibelMilliwatts, network.Bssid));
            */
        }
        
        LogWifi.Log("found " + report.AvailableNetworks.Count + " APs");
        SendWifiLocation(networks);
    }

    public async void Scan() {
        if (ready) {
            ready = false;
            var result = await WiFiAdapter.FindAllAdaptersAsync();
            if (result.Count >= 1)
            {
                var firstAdapter = result[0];
                await firstAdapter.ScanAsync();
                GenerateNetworkReport(firstAdapter.NetworkReport);
            }
            ready = true;
            Scan();
        }
        
    }
#endif

    void Start ()
    {
        com = com == null ? com = GetComponent<Communication>() : com;
#if WINDOWS_UWP
        LogWifi.Log("Looking for WiFi APs");
        Scan();
#else
        LogWifi.Log("sorry, this only works as UWP-build");
#endif
    }
}
