
#include <CurieBLE.h>
#include <Wire.h>

byte complete=0;
byte GPIO1 = 0;
byte GPIO2 = 0;
byte GPIO3 = 0;
unsigned int data_received=0;
#define CONFIG_REGISTER 0x0c 
#define OUTPUT_REGISTER 0x04
#define transLine 0x22

BLEPeripheral blePeripheral;  // BLE Peripheral Device (the board you're programming)
BLEService automationService("19B10000-E8F2-537E-4F6C-D104768A1214"); // BLE LED Service

// BLE LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEUnsignedIntCharacteristic controlCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

void I2CSet(byte Device_Address,byte cmd_address, byte data1, byte data2, byte data3)
{
    //I2C transmission start
    Wire.begin();
    //I2C transmission address begin
    Wire.beginTransmission(Device_Address);
    Wire.write(cmd_address);
    Wire.write(data1);
    Wire.write(data2);
    Wire.write(data3);
    //End of the I2C transmission
    Wire.endTransmission();
    delay(300);
}

void setdigitalpin(byte port, int data)
{
  complete = 1;
  //GPIO expander has 3 ports 
  //1 port is all output to drive motors
  //1 port is GPIO
  //1 port is Relay
   if((port > 0) && (port <= 8))
   {
      if(data == 1)
      {
        GPIO1 |= (1 << (port-1));
      }
      else
      {
        GPIO1 &= ~(1 << (port-1));
        
      }
   }
   else if((port > 8) && (port <=16))
   {
      if( data == 1)
      {
         GPIO2 |= (1 << (port-9));
      }
      else {
      GPIO2 &= ~(1 << (port-9));
      }
   }
   else if ((port > 16) && (port <= 24))
   {
      if( data == 1)
      {
        GPIO3 |= (1 << (port-17));
      }
      else
      {
        GPIO3 &= ~(1 << (port-17));
      }
   }
   I2CSet(transLine,OUTPUT_REGISTER,GPIO1,GPIO2,GPIO3);

   Serial.println("I2Cset done");
   Serial.flush();
   complete =0;
}

void setup() {
  //Set ports are o/p for now
  I2CSet(transLine,CONFIG_REGISTER,0x0,0x0,0x0);
  Serial.begin(9600);

  // set advertised local name and service UUID:
  blePeripheral.setLocalName("AutomationBLE");
  blePeripheral.setAdvertisedServiceUuid(automationService.uuid());

  // add service and characteristic:
  blePeripheral.addAttribute(automationService);
  blePeripheral.addAttribute(controlCharacteristic);

  // set the initial value for the characeristic:
  //switchCharacteristic.setValue(0);

  // begin advertising BLE service:
  blePeripheral.begin();

  Serial.println("BLE Automation Peripheral");
}

void loop() {
  byte data[4];
  byte port = 0,data_val = 0;
  byte pcondition = 0;
  byte dcondition = 0;
  // listen for BLE peripherals to connect:
  BLECentral central = blePeripheral.central();

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
    if(controlCharacteristic.written()) {
         data_received=0;
         pcondition = 0;
         dcondition = 0;
         data_received = controlCharacteristic.value();
         data[0] = data_received & 0xFFFF;
         data[1] = (data_received >> 8) & 0xFFFF;
         data[2] = (data_received >> 16) & 0xFFFF;
         data[3] = (data_received >> 24) & 0xFFFF;
  
            
         port = (data[0] - '0')*10 + (data[1] - '0');
         data_val = (data[2] - '0')*10 + (data[3] - '0');
         
         
         if((port > 0) && (port < 25))
         {
            pcondition =1;
         }
         if((data_val >=0) && (data_val <= 1))
         { 
            dcondition = 1;
         }
         if(pcondition && dcondition)
         {
            Serial.print(port);
            Serial.print(":");
            Serial.println(data_val);
            setdigitalpin(port,data_val);
         }
   
      }
   
      
    }
      // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
  }
}
