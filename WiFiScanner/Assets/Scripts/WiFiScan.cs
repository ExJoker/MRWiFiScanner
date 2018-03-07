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
#if WINDOWS_UWP
    private WiFiAdapter adapter;
    private bool ready = true;

    private void GenerateNetworkReport(WiFiNetworkReport report) {
        var networks = new List<string>();
        foreach (var network in report.AvailableNetworks)
        {
            LogWifi.Log(string.Format("SSID: {0} -- SignalBars: {1} -- Db: {2} -- Mac: {3}", 
network.Ssid, network.SignalBars, network.NetworkRssiInDecibelMilliwatts, network.Bssid));
        }
        LogWifi.Log("found " + report.AvailableNetworks.Count + " APs");
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
#if WINDOWS_UWP
        LogWifi.Log("Looking for WiFi APs");
        Scan();
#else
        LogWifi.Log("sorry, this only works as UWP-build");
#endif
    }
}
