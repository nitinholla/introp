
var handleReceptacle = {}
var isSecuredMode = false;
var fs = require('fs');

//Paths from Json
var configJson = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var unsecured_path = configJson.iotivity_node_unsecured_path;
var secured_path = configJson.iotivity_node_secured_path;
isSecuredMode = configJson.isSecuredMode;
///////

function createDevice(DeviceType,count=0) {
    if (isSecuredMode) {
        console.log("Secured Mode");
        iotivity = require(secured_path+"/lowlevel");
        StorageHandler = require(secured_path+"/lib/StorageHandler_GRL")('svr','jw',DeviceType+"_"+count.toString())
        iotivity.OCRegisterPersistentStorageHandler(StorageHandler);
      }
      else {
        console.log("unsecured Mode");
        iotivity = require(unsecured_path+"/lowlevel");
      }
    var device_rt, resources;
    [device_rt, resources] = getRes(DeviceType);

    console.log("Starting OCF stack in server mode");

    iotivity.OCInit(null, 0, iotivity.OCMode.OC_SERVER);

    intervalId = setInterval(function () {
        //console.log(_iotivity);
        //process.stdout.write("-");
        var processResult = iotivity.OCProcess();
    }, 100);

    //intervalId = setInterval( () => iotivity.OCProcess(), 100 );

    console.log("Device Id " + device_rt);
     
    iotivity.OCSetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_DEVICE,
        iotivity.OC_RSRVD_SPEC_VERSION, "ocf.1.1.0");
    iotivity.OCSetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_DEVICE,
        iotivity.OC_RSRVD_DATA_MODEL_VERSION, "ocf.res.1.3.0,ocf.sh.1.3.0");
    iotivity.OCSetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_DEVICE,
        iotivity.OC_RSRVD_DEVICE_NAME, "Interop Board-" + DeviceType);

    // iotivity.OCSetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_DEVICE,
    //     "rt_", device_rt);
    iotivity.OCSetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_DEVICE,
            "iopb.com.iotivity.proc_id", process.pid.toString());

    iotivity.OCSetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_PLATFORM,
        iotivity.OC_RSRVD_MFG_NAME, "GRL");
    devHandler = iotivity.OCGetResourceHandleAtUri( "/oic/d" );
    console.log(iotivity.OCGetResourceTypeName(devHandler,0));
    iotivity.OCBindResourceTypeToResource(devHandler,device_rt);
    console.log(iotivity.OCGetResourceTypeName(devHandler,1));
    // var result = {};
    // iotivity.OCGetPropertyValue(iotivity.OCPayloadType.PAYLOAD_TYPE_DEVICE,"rt_", result);
    // console.log(result);
    
    //***********Random Pin******************* */
    // if ( iotivity.SetRandomPinPolicy( 16,
    //     iotivity.OicSecPinType_t.NUM_PIN |
    //     iotivity.OicSecPinType_t.UPPERCASE_CHAR_PIN |
    //     iotivity.OicSecPinType_t.LOWERCASE_CHAR_PIN ) != iotivity.OCStackResult.OC_STACK_OK ) {
    // console.log( "Failed to set random PIN policy" );
    // }
    
    // function displayPin( pin ) {
    // console.log( "Please Enter this PIN code: " + pin );
    // }
    
    // result = iotivity.SetDisplayPinWithContextCB( displayPin );
    // if ( result != iotivity.OCStackResult.OC_STACK_OK ) {
    // console.log( "Failed to set PIN display callback: " + result );
    // }
    
    // iotivity.SetClosePinDisplayCB( function closePinDisplay() {
    // console.log( "Forget you ever saw that PIN. This PIN display is closed." );
    // } );



    var rt_uri, rt_string, rt_values;
    for (var key in resources) {
        console.log(key);
        var rt_uri = key;
        for (var key2 in resources[key]) {
            var rt_string = key2;
            //console.log(key2);
            var rt_values = resources[key][key2];
            //console.log(values);
            try{
                CreateOicRes(rt_uri, rt_string, rt_values);
            }
            catch (e){
                console.log("ocd.js -->"+e.message);
            }
        }
    }
};




function CreateOicRes(rt_uri, rt_string, rt_values) {
    var _resourceProperty = iotivity.OCResourceProperty.OC_DISCOVERABLE;
    if(isSecuredMode === true){
        _resourceProperty = iotivity.OCResourceProperty.OC_DISCOVERABLE | iotivity.OCResourceProperty.OC_SECURE;
    }
    iotivity.OCCreateResource(
        // The bindings fill in this object
        handleReceptacle,
        rt_string,
        iotivity.OC_RSRVD_INTERFACE_DEFAULT,
        "/" + rt_uri,
        function (flag, request) {
            console.log("Entity handler called with flag = " + flag + " and the following request:" + rt_values);
            console.log(JSON.stringify(request, null, 4))
            if (request.method === iotivity.OCMethod.OC_REST_GET) {
                console.log("Get on " + rt_uri);
                responseResult = iotivity.OCDoResponse({
                    requestHandle: request.requestHandle,
                    resourceHandle: request.resource,
                    ehResult: iotivity.OCEntityHandlerResult.OC_EH_OK,
                    payload: {
                        type: iotivity.OCPayloadType.PAYLOAD_TYPE_REPRESENTATION,
                        values: rt_values
                        // {
                        //   answer: "As many as wanting." + queryData.deviceType
                        // }
                    },
                    resourceUri: rt_uri,
                    //sendVendorSpecificHeaderOptions: []
                });
            }
            else if (request.method === iotivity.OCMethod.OC_REST_PUT) {
                console.log("Put on " + rt_uri);
                rt_values = request.payload.values;                
                responseResult = iotivity.OCDoResponse({
                    requestHandle: request.requestHandle,
                    resourceHandle: request.resource,
                    ehResult: iotivity.OCEntityHandlerResult.OC_EH_OK,
                    payload: {
                        type: iotivity.OCPayloadType.PAYLOAD_TYPE_REPRESENTATION,
                        values: rt_values
                    },
                    resourceUri: rt_uri,
                });
            }            
            else {
                throw new Error("Invalid request method");
            }

            return iotivity.OCEntityHandlerResult.OC_EH_OK;
        },
        _resourceProperty);
};

//Exit gracefully when interrupted
//process.on("SIGINT", function () {
function quit() {
    console.log("SIGINT: Quitting...");

    // Tear down the processing loop and stop iotivity
    clearInterval(intervalId);
    iotivity.OCDeleteResource(handleReceptacle.handle);
    iotivity.OCStop();

    // Exit
    //process.exit(0);
}

function getRes(DeviceType) {
    console.log('--->'+DeviceType)
    var rt = "oic.d." + DeviceType;
    var resources = {
        "ResSwitch":
            {
                "oic.r.switch.binary":
                    {
                        value: false
                    }
            }
    };
    if (DeviceType === "ac") {
        rt = "oic.d.ac";
        resources = {
            "AcResSwitch":
                {
                    "oic.r.switch.binary":
                        {
                            value: false
                        }
                },
            "AcResTempControl": {
                "oic.r.temperature": {
                    "temperature": 26,
                    "units": "c"
                }
            }

        };
    }
    else if (DeviceType === "light") {
        rt = "oic.d.light";
        resources = {
            "lightResSwitch":
                {
                    "oic.r.switch.binary":
                        {
                            value: false
                        }
                }
        };
    }
    else if (DeviceType === "fan") {
        rt = "oic.d.fan";
        resources = {
            "fanResSwitch":
                {
                    "oic.r.switch.binary":
                        {
                            value: false
                        }
                }
        };
    }
    else {
        rt = rt;
        resources = resources;
    }
    return [rt, resources];
}




//_________________________main_________________________________________________
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'a' });
var log_stdout = process.stdout;

console.log = function (d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

process.on('uncaughtException', (err) => {
    console.log("Handled Error: process: ");
    console.log(err.stack);
  });
var dev_list = {};
dev_list[process.argv[2]] = new createDevice(process.argv[2],process.argv[3]);

process.on("SIGINT", function () {
    quit();
    process.exit(0);

});
//_______________________________________________________________________________

