#include <Arduino.h>
#include <SocketIoClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>


#define USER_SERIAL Serial

const char *ssid = "HARSHADA";
const char *pass = "aniket@2552001";
String deviceId = "62089afbf93bdf9dc2ab2c6e";
String roomId = "cdc13982-13d1-424c-a5f8-7b1391691368";
SocketIoClient webSocket;

#define trig D5   // Trig pin
#define echo D6   // Echo Pin 
long duration, inches, cm;
long currentVal = 0;
long prevVal = 0;

void setup() {
  pinMode(trig, OUTPUT); // Sets the trigPin as an Output
  pinMode(echo, INPUT); // Sets the echoPin as an Input

  USER_SERIAL.begin(115200);
  searchWiFi();
  connectWiFi();
  connectSocket();


  // use HTTP Basic Authorization this is optional remove if not needed
//    webSocket.setAuthorization("aniket12345", "12345");
}

void loop() {
  webSocket.loop();
  currentVal = level();
  if ( currentVal != prevVal) {
    sendMeasureData(currentVal);
    prevVal = currentVal;
  }

}

void sendMeasureData(long data1) {
  delay(400);
  DynamicJsonDocument doc(1024);
  doc["level"] = data1;
  char json[500];
  serializeJson(doc, json);
  webSocket.emit("room-message", json);
}


long level() {
  //  digitalWrite(trig, LOW);
  //  delayMicroseconds(2);
  //  digitalWrite(trig, HIGH);
  //  delayMicroseconds(10);
  //  digitalWrite(trig, LOW);
  //  long t = pulseIn(echo, HIGH);
  //  long cm = t / 29 / 2;
  //
  //  long level = 15 - cm; // Change 15 according to your tank depth
  //  if (level < 0) {
  //    level = 0;
  //  }
  //  Serial.println(level);
  long level = rand() % 100 + 1;
  return level;
}


void welcome(const char *message, size_t length)
{


  DynamicJsonDocument doc(1024);
  deserializeJson(doc, message);
  const char* val = doc["id"];
  USER_SERIAL.println(val);

}

void connectSocket() {
  webSocket.on("welcome", welcome);
  webSocket.begin("api-xpress-iot.herokuapp.com");
  DynamicJsonDocument doc(1024);
  doc["deviceId"]   = deviceId;
  doc["roomId"]   = roomId;
  char json[100];
  serializeJson(doc, json);
  webSocket.emit("join", json);
}

void searchWiFi() {
  int numberOfNetwork = WiFi.scanNetworks();
  USER_SERIAL.println("----");

  for (int i = 0; i < numberOfNetwork; i++ ) {
    USER_SERIAL.print("Network name: ");
    USER_SERIAL.println(WiFi.SSID(i));
    USER_SERIAL.print("Signal strength: ");
    USER_SERIAL.println(WiFi.RSSI(i));
    USER_SERIAL.println("--------------");
  }
}


void connectWiFi() {
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    USER_SERIAL.print(".");
    delay(1000);
  }

  USER_SERIAL.print("");
  USER_SERIAL.println("WiFi connected");
  USER_SERIAL.print("IP Address : ");
  USER_SERIAL.println(WiFi.localIP());

}
