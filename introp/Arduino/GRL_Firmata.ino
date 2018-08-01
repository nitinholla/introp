#include <Arduino.h>
#include <Wire.h>

byte complete=0;
byte GPIO1 = 0;
byte GPIO2 = 0;
byte GPIO3 = 0;
#define CONFIG_REGISTER 0x0c 
#define OUTPUT_REGISTER 0x04

//GPIO expander address
#define transLine 0x22

//Function to set the I2C
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
   if( port <= 8)
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

   Serial.print("I2Cset done");
   Serial.flush();
   complete =0;
}


void setup() {
  //Set ports are o/p for now
  I2CSet(transLine,CONFIG_REGISTER,0x0,0x0,0x0);

  Serial.begin(57600);
  //Wait till the Serial comes
  while (!Serial) {;}
}

void loop() {
  char data[5];
  byte port = 0,data_val = 0;
  byte pcondition = 0;
  byte dcondition = 0;
  Serial.flush();
  
  //Check if Serial data is available
  while (!Serial.available());

  //Check if serial data is greater than 0 to read the data`
  while(Serial.available() > 0)
  {
       int bRead;
	   //read the port and value to be set 4 characters
       bRead = Serial.readBytesUntil('\0',data,4);
	   //convert the character to byte
       port = (data[0] - '0')*10 + (data[1] - '0');
       data_val = (data[2] - '0')*10 + (data[3] - '0');
      
	   //Currently for expander there are only 24 GPIO ports
	   //Port 0 ( 1 to 8 pins)
	   //Port 1 ( 9 to 16 pins) 
	   //Port 2 ( 17 to 22 pins) - Connected to Relay
       if((port > 0) && (port < 25))
       {
          pcondition =1;
       }
       if((data_val >=0) && (data_val <= 1))
       {
          dcondition = 1;
       }
//Debug
#if 0
       Serial.print(port);
       Serial.print(":");
       Serial.print(data_val);
#endif
       if(pcondition && dcondition)
       {
          setdigitalpin(port,data_val);
       }
    
   }   
}
