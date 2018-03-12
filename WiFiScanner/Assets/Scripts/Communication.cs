using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Moulin.DDP;
using System;

public class Communication : MonoBehaviour {
    public string serverUrl = "ws://localhost:3000/websocket";

    private DdpConnection ddpConnection;

    void Start () {
        if (ddpConnection == null)
        {
            ddpConnection = new DdpConnection(serverUrl);
            ddpConnection.OnConnected += OnConnected; // just for debugging
        }

        Debug.Log("connecting to " + serverUrl);
        ddpConnection.Connect();
    }

    private void OnConnected(DdpConnection connection)
    {
        Debug.Log("connected!");
    }

    public MethodCall Call(String name, params JSONObject[] data)
    {
        return ddpConnection.Call(name, data);
    }
}
