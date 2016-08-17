import System.Net.Sockets;
import System.Net;
import System.Text;
import System;

private var udpClient: UdpClient;
private var RemoteIpEndPoint: IPEndPoint;

function GetLittleEndianIntegerFromByteArray(data: Byte[], startIndex: int): int {

    return (data[startIndex + 3] << 24)
         | (data[startIndex + 2] << 16)
         | (data[startIndex + 1] << 8)
         | data[startIndex];
}


function ReceiveCallback(ar: IAsyncResult)
{
//  UdpClient u = (UdpClient)((UdpState)(ar.AsyncState)).u;
//  IPEndPoint e = (IPEndPoint)((UdpState)(ar.AsyncState)).e;

  var receiveBytes: Byte[] = udpClient.EndReceive(ar, RemoteIpEndPoint);

  var receiveNum = GetLittleEndianIntegerFromByteArray(receiveBytes, 0);

  //Console.WriteLine("Received: {0}", receiveString);
  print('->' + receiveNum);
  //messageReceived = true;
}

function sendStuff(stuff: String) {
    // Sends a message to the host to which you have connected.
    var sendBytes = Encoding.ASCII.GetBytes(stuff);

    // TODO: make sure this will not block
    udpClient.Send(sendBytes, sendBytes.Length);
}

function udpListen() {

  try{

    // Blocks until a message returns on this socket from a remote host.
    udpClient.BeginReceive(new AsyncCallback(ReceiveCallback), null);
  }
  catch (e) {
    print(e.ToString());
  }
}

function Start() {

  //IPEndPoint object will allow us to read datagrams sent from any source.
  RemoteIpEndPoint = new IPEndPoint(IPAddress.Any, 11000);

  udpClient = new UdpClient(RemoteIpEndPoint);
  udpClient.Connect("localhost", 11001);
}

function OnApplicationQuit() {
  udpClient.Close();
}

var i = 0;

function Update() {
  sendStuff('hi ' + ++i);
  udpListen();
}
