{ OCTransportAdapter:
    { OC_DEFAULT_ADAPTER: 0,
      OC_ADAPTER_IP: 1,
      OC_ADAPTER_GATT_BTLE: 2,
      OC_ADAPTER_RFCOMM_BTEDR: 4,
      OC_ADAPTER_TCP: 16,
      OC_ADAPTER_NFC: 32 },
   OCTransportBTFlags_t:
    { OC_DEFAULT_BT_FLAGS: 0,
      OC_LE_ADV_DISABLE: 1,
      OC_LE_ADV_ENABLE: 2,
      OC_LE_SERVER_DISABLE: 16,
      OC_EDR_SERVER_DISABLE: 128 },
   OCLogLevel: { OC_LOG_LEVEL_ALL: 1, OC_LOG_LEVEL_INFO: 2 },
   OCTransportFlags:
    { OC_DEFAULT_FLAGS: 0,
      OC_FLAG_SECURE: 16,
      OC_IP_USE_V6: 32,
      OC_IP_USE_V4: 64,
      OC_MULTICAST: 128,
      OC_SCOPE_INTERFACE: 1,
      OC_SCOPE_LINK: 2,
      OC_SCOPE_REALM: 3,
      OC_SCOPE_ADMIN: 4,
      OC_SCOPE_SITE: 5,
      OC_SCOPE_ORG: 8,
      OC_SCOPE_GLOBAL: 14 },
   OCConnectivityType:
    { CT_DEFAULT: 0,
      CT_ADAPTER_IP: 65536,
      CT_ADAPTER_GATT_BTLE: 131072,
      CT_ADAPTER_RFCOMM_BTEDR: 262144,
      CT_ADAPTER_TCP: 1048576,
      CT_ADAPTER_NFC: 2097152,
      CT_FLAG_SECURE: 16,
      CT_IP_USE_V6: 32,
      CT_IP_USE_V4: 64,
      CT_SCOPE_INTERFACE: 1,
      CT_SCOPE_LINK: 2,
      CT_SCOPE_REALM: 3,
      CT_SCOPE_ADMIN: 4,
      CT_SCOPE_SITE: 5,
      CT_SCOPE_ORG: 8,
      CT_SCOPE_GLOBAL: 14 },
   OCMethod:
    { OC_REST_NOMETHOD: 0,
      OC_REST_GET: 1,
      OC_REST_PUT: 2,
      OC_REST_POST: 4,
      OC_REST_DELETE: 8,
      OC_REST_OBSERVE: 16,
      OC_REST_OBSERVE_ALL: 32,
      OC_REST_PRESENCE: 128,
      OC_REST_DISCOVER: 256 },
   OCPayloadFormat:
    { OC_FORMAT_CBOR: 0,
      OC_FORMAT_VND_OCF_CBOR: 1,
      OC_FORMAT_JSON: 2,
      OC_FORMAT_UNDEFINED: 3,
      OC_FORMAT_UNSUPPORTED: 4 },
   OCMode: { OC_CLIENT: 0, OC_SERVER: 1, OC_CLIENT_SERVER: 2, OC_GATEWAY: 3 },
   OCQualityOfService: { OC_LOW_QOS: 0, OC_MEDIUM_QOS: 1, OC_HIGH_QOS: 2, OC_NA_QOS: 3 },
   OCResourceProperty:
    { OC_RES_PROP_NONE: 0,
      OC_DISCOVERABLE: 1,
      OC_OBSERVABLE: 2,
      OC_ACTIVE: 4,
      OC_SLOW: 8,
      OC_NONSECURE: 64,
      OC_SECURE: 16,
      OC_EXPLICIT_DISCOVERABLE: 32 },
   OCTransportProtocolID: { OC_INVALID_ID: 1, OC_COAP_ID: 2 },
   OCStackResult:
    { OC_STACK_OK: 0,
      OC_STACK_RESOURCE_CREATED: 1,
      OC_STACK_RESOURCE_DELETED: 2,
      OC_STACK_CONTINUE: 3,
      OC_STACK_RESOURCE_CHANGED: 4,
      OC_STACK_INVALID_URI: 20,
      OC_STACK_INVALID_QUERY: 21,
      OC_STACK_INVALID_IP: 22,
      OC_STACK_INVALID_PORT: 23,
      OC_STACK_INVALID_CALLBACK: 24,
      OC_STACK_INVALID_METHOD: 25,
      OC_STACK_INVALID_PARAM: 26,
      OC_STACK_INVALID_OBSERVE_PARAM: 27,
      OC_STACK_NO_MEMORY: 28,
      OC_STACK_COMM_ERROR: 29,
      OC_STACK_TIMEOUT: 30,
      OC_STACK_ADAPTER_NOT_ENABLED: 31,
      OC_STACK_NOTIMPL: 32,
      OC_STACK_NO_RESOURCE: 33,
      OC_STACK_RESOURCE_ERROR: 34,
      OC_STACK_SLOW_RESOURCE: 35,
      OC_STACK_DUPLICATE_REQUEST: 36,
      OC_STACK_NO_OBSERVERS: 37,
      OC_STACK_OBSERVER_NOT_FOUND: 38,
      OC_STACK_VIRTUAL_DO_NOT_HANDLE: 39,
      OC_STACK_INVALID_OPTION: 40,
      OC_STACK_MALFORMED_RESPONSE: 41,
      OC_STACK_PERSISTENT_BUFFER_REQUIRED: 42,
      OC_STACK_INVALID_REQUEST_HANDLE: 43,
      OC_STACK_INVALID_DEVICE_INFO: 44,
      OC_STACK_INVALID_JSON: 45,
      OC_STACK_UNAUTHORIZED_REQ: 46,
      OC_STACK_TOO_LARGE_REQ: 47,
      OC_STACK_PDM_IS_NOT_INITIALIZED: 48,
      OC_STACK_DUPLICATE_UUID: 49,
      OC_STACK_INCONSISTENT_DB: 50,
      OC_STACK_AUTHENTICATION_FAILURE: 51,
      OC_STACK_NOT_ALLOWED_OXM: 52,
      OC_STACK_CONTINUE_OPERATION: 53,
      OC_STACK_BAD_ENDPOINT: 54,
      OC_STACK_PRESENCE_STOPPED: 128,
      OC_STACK_PRESENCE_TIMEOUT: 129,
      OC_STACK_PRESENCE_DO_NOT_HANDLE: 130,
      OC_STACK_USER_DENIED_REQ: 131,
      OC_STACK_NOT_ACCEPTABLE: 132,
      OC_STACK_FORBIDDEN_REQ: 133,
      OC_STACK_INTERNAL_SERVER_ERROR: 134,
      OC_STACK_GATEWAY_TIMEOUT: 135,
      OC_STACK_SERVICE_UNAVAILABLE: 136,
      OC_STACK_ERROR: 255 },
   OCObserveAction:
    { OC_OBSERVE_REGISTER: 0,
      OC_OBSERVE_DEREGISTER: 1,
      OC_OBSERVE_NO_OPTION: 2 },
   OCEntityHandlerResult:
    { OC_EH_OK: 0,
      OC_EH_ERROR: 1,
      OC_EH_SLOW: 2,
      OC_EH_RESOURCE_CREATED: 201,
      OC_EH_RESOURCE_DELETED: 202,
      OC_EH_VALID: 203,
      OC_EH_CHANGED: 204,
      OC_EH_CONTENT: 205,
      OC_EH_BAD_REQ: 400,
      OC_EH_UNAUTHORIZED_REQ: 401,
      OC_EH_BAD_OPT: 402,
      OC_EH_FORBIDDEN: 403,
      OC_EH_RESOURCE_NOT_FOUND: 404,
      OC_EH_METHOD_NOT_ALLOWED: 405,
      OC_EH_NOT_ACCEPTABLE: 406,
      OC_EH_TOO_LARGE: 413,
      OC_EH_UNSUPPORTED_MEDIA_TYPE: 415,
      OC_EH_INTERNAL_SERVER_ERROR: 500,
      OC_EH_BAD_GATEWAY: 502,
      OC_EH_SERVICE_UNAVAILABLE: 503,
      OC_EH_RETRANSMIT_TIMEOUT: 504 },
   OCTpsSchemeFlags: { OC_NO_TPS: 0, OC_COAP: 1, OC_COAPS: 2, OC_ALL: 65535 },
   OCPayloadType:
    { PAYLOAD_TYPE_INVALID: 0,
      PAYLOAD_TYPE_DISCOVERY: 1,
      PAYLOAD_TYPE_DEVICE: 2,
      PAYLOAD_TYPE_PLATFORM: 3,
      PAYLOAD_TYPE_REPRESENTATION: 4,
      PAYLOAD_TYPE_SECURITY: 5,
      PAYLOAD_TYPE_PRESENCE: 6,
      PAYLOAD_TYPE_DIAGNOSTIC: 7,
      PAYLOAD_TYPE_INTROSPECTION: 8 },
   OCRepPayloadPropType:
    { OCREP_PROP_NULL: 0,
      OCREP_PROP_INT: 1,
      OCREP_PROP_DOUBLE: 2,
      OCREP_PROP_BOOL: 3,
      OCREP_PROP_STRING: 4,
      OCREP_PROP_BYTE_STRING: 5,
      OCREP_PROP_OBJECT: 6,
      OCREP_PROP_ARRAY: 7 },
   OCEntityHandlerFlag: { OC_REQUEST_FLAG: 2, OC_OBSERVE_FLAG: 4 },
   OCStackApplicationResult: { OC_STACK_DELETE_TRANSACTION: 0, OC_STACK_KEEP_TRANSACTION: 1 },
   OCPrm_t: { DP_NOT_ALLOWED: 0, DP_PRE_CONFIGURED: 1, DP_RANDOM_PIN: 2 },
   OCPresenceTrigger:
    { OC_PRESENCE_TRIGGER_CREATE: 0,
      OC_PRESENCE_TRIGGER_CHANGE: 1,
      OC_PRESENCE_TRIGGER_DELETE: 2 },
   OicSecPinType_t: { NUM_PIN: 1, UPPERCASE_CHAR_PIN: 2, LOWERCASE_CHAR_PIN: 4 },
   CADtlsPskCredType_t:
    { CA_DTLS_PSK_HINT: 0,
      CA_DTLS_PSK_IDENTITY: 1,
      CA_DTLS_PSK_KEY: 2 },
   MAX_URI_LENGTH: 256,
   MAX_QUERY_LENGTH: 256,
   MAX_MANUFACTURER_NAME_LENGTH: 64,
   MAX_MANUFACTURER_URL_LENGTH: 256,
   MAX_PLATFORM_NAME_LENGTH: 64,
   MAX_PLATFORM_URL_LENGTH: 256,
   MAX_CONTAINED_RESOURCES: 5,
   MAX_HEADER_OPTIONS: 50,
   MAX_HEADER_OPTION_DATA_LENGTH: 1024,
   MAX_CB_TIMEOUT_SECONDS: 7200,
   IOTIVITY_VERSION: '1.3.1',
   OC_RSRVD_WELL_KNOWN_URI: '/oic/res',
   OC_RSRVD_DEVICE_URI: '/oic/d',
   OC_RSRVD_PLATFORM_URI: '/oic/p',
   OC_RSRVD_RESOURCE_TYPES_URI: '/oic/res/types/d',
   OC_RSRVD_GATEWAY_URI: '/oic/gateway',
   OC_RSRVD_WELL_KNOWN_MQ_URI: '/oic/ps',
   OC_RSRVD_KEEPALIVE_URI: '/oic/ping',
   OC_RSRVD_PRESENCE_URI: '/oic/ad',
   OC_RSRVD_DEVICE_PRESENCE_URI: '/oic/prs',
   OC_DEFAULT_PRESENCE_TTL_SECONDS: 60,
   OC_MULTICAST_DISCOVERY_URI: '/oic/res',
   OC_QUERY_SEPARATOR: '&;',
   OC_KEY_VALUE_DELIMITER: '=',
   OC_MAX_PRESENCE_TTL_SECONDS: 86400,
   OC_RSRVD_TRIGGER_CREATE: 'create',
   OC_RSRVD_TRIGGER_CHANGE: 'change',
   OC_RSRVD_TRIGGER_DELETE: 'delete',
   OC_RSRVD_OC: 'oic',
   OC_RSRVD_PAYLOAD: 'payload',
   OC_RSRVD_HREF: 'href',
   OC_RSRVD_PROPERTY: 'prop',
   OC_RSRVD_REPRESENTATION: 'rep',
   OC_RSRVD_CONTENT_TYPE: 'ct',
   OC_RSRVD_RESOURCE_TYPE: 'rt',
   OC_RSRVD_RESOURCE_TYPE_PRESENCE: 'oic.wk.ad',
   OC_RSRVD_RESOURCE_TYPE_DEVICE: 'oic.wk.d',
   OC_RSRVD_RESOURCE_TYPE_PLATFORM: 'oic.wk.p',
   OC_RSRVD_RESOURCE_TYPE_MAINTENANCE: 'oic.wk.mnt',
   OC_RSRVD_RESOURCE_TYPE_COLLECTION: 'oic.wk.col',
   OC_RSRVD_RESOURCE_TYPE_RES: 'oic.wk.res',
   OC_RSRVD_RESOURCE_TYPE_MQ_BROKER: 'oic.wk.ps',
   OC_RSRVD_RESOURCE_TYPE_MQ_TOPIC: 'oic.wk.ps.topic',
   OC_RSRVD_RESOURCE_TYPE_INTROSPECTION: 'oic.wk.introspection',
   OC_RSRVD_RESOURCE_TYPE_INTROSPECTION_PAYLOAD: 'oic.wk.introspection.payload',
   OC_RSRVD_INTERFACE: 'if',
   OC_RSRVD_TTL: 'ttl',
   OC_RSRVD_NONCE: 'non',
   OC_RSRVD_TRIGGER: 'trg',
   OC_RSRVD_LINKS: 'links',
   OC_RSRVD_INTERFACE_DEFAULT: 'oic.if.baseline',
   OC_RSRVD_INTERFACE_READ: 'oic.if.r',
   OC_RSRVD_INTERFACE_READ_WRITE: 'oic.if.rw',
   OC_RSRVD_INTERFACE_LL: 'oic.if.ll',
   OC_RSRVD_INTERFACE_BATCH: 'oic.if.b',
   OC_RSRVD_INTERFACE_ACTUATOR: 'oic.if.a',
   OC_RSRVD_INTERFACE_SENSOR: 'oic.if.s',
   OC_RSRVD_INTERFACE_GROUP: 'oic.mi.grp',
   OC_RSRVD_FW_VERSION: 'mnfv',
   OC_RSRVD_HOST_NAME: 'hn',
   OC_RSRVD_POLICY: 'p',
   OC_RSRVD_BITMAP: 'bm',
   OC_RSRVD_SECURE: 'sec',
   OC_SECURITY_DB_FILE_NAME: 'oic_svr_db.json',
   OC_SECURITY_DB_DAT_FILE_NAME: 'oic_svr_db.dat',
   OC_RSRVD_HOSTING_PORT: 'port',
   OC_RSRVD_TCP_PORT: 'x.org.iotivity.tcp',
   OC_RSRVD_TLS_PORT: 'x.org.iotivity.tls',
   OC_RSRVD_SERVER_INSTANCE_ID: 'sid',
   OC_RSRVD_ENDPOINTS: 'eps',
   OC_RSRVD_ENDPOINT: 'ep',
   OC_RSRVD_PRIORITY: 'pri',
   OC_RSRVD_INSTANCE_ID: 'id',
   OC_RSRVD_PLATFORM_ID: 'pi',
   OC_RSRVD_MFG_NAME: 'mnmn',
   OC_RSRVD_MFG_URL: 'mnml',
   OC_RSRVD_MODEL_NUM: 'mnmo',
   OC_RSRVD_MFG_DATE: 'mndt',
   OC_RSRVD_PLATFORM_VERSION: 'mnpv',
   OC_RSRVD_OS_VERSION: 'mnos',
   OC_RSRVD_HARDWARE_VERSION: 'mnhw',
   OC_RSRVD_FIRMWARE_VERSION: 'mnfv',
   OC_RSRVD_SUPPORT_URL: 'mnsl',
   OC_RSRVD_SYSTEM_TIME: 'st',
   OC_RSRVD_VID: 'vid',
   OC_RSRVD_DEVICE_ID: 'di',
   OC_RSRVD_DEVICE_NAME: 'n',
   OC_RSRVD_SPEC_VERSION: 'icv',
   OC_RSRVD_DATA_MODEL_VERSION: 'dmv',
   OC_RSRVD_DEVICE_DESCRIPTION: 'ld',
   OC_RSRVD_SOFTWARE_VERSION: 'sv',
   OC_RSRVD_DEVICE_MFG_NAME: 'dmn',
   OC_RSRVD_DEVICE_MODEL_NUM: 'dmno',
   OC_RSRVD_PROTOCOL_INDEPENDENT_ID: 'piid',
   OC_SPEC_VERSION: 'ocf.1.1.0',
   OC_SPEC_VERSION_VALUE: 2048,
   OC_DATA_MODEL_VERSION: 'ocf.res.1.1.0,ocf.sh.1.1.0',
   OC_RSRVD_INTROSPECTION_NAME: 'n',
   OC_RSRVD_INTROSPECTION_NAME_VALUE: 'Introspection',
   OC_RSRVD_INTROSPECTION_URL_INFO: 'urlInfo',
   OC_RSRVD_INTROSPECTION_URL: 'url',
   OC_RSRVD_INTROSPECTION_PROTOCOL: 'protocol',
   OC_RSRVD_INTROSPECTION_CONTENT_TYPE: 'content-type',
   OC_RSRVD_INTROSPECTION_CONTENT_TYPE_VALUE: 'application/cbor',
   OC_RSRVD_INTROSPECTION_VERSION: 'version',
   OC_RSRVD_INTROSPECTION_VERSION_VALUE: 1,
   OC_INTROSPECTION_FILE_NAME: 'introspection.dat',
   OC_MULTICAST_PREFIX: '224.0.1.187:5683',
   OC_MULTICAST_IP: '224.0.1.187',
   OC_MULTICAST_PORT: 5683,
   MAX_ADDR_STR_SIZE: 66,
   MAC_ADDR_STR_SIZE: 17,
   MAC_ADDR_BLOCKS: 6,
   MAX_IDENTITY_SIZE: 37,
   UUID_IDENTITY_SIZE: 16,
   OC_RSRVD_RD_URI: '/oic/rd',
   OC_RSRVD_RESOURCE_TYPE_RD: 'oic.wk.rd',
   OC_RSRVD_RD_DISCOVERY_SEL: 'sel',
   OC_RSRVD_PROXY_URI: '/oic/chp',
   OC_RSRVD_PROXY_OPTION_ID: 35,
   OC_RSRVD_INS: 'ins',
   OC_RSRVD_RTS: 'rts',
   OC_RSRVD_DREL: 'drel',
   OC_RSRVD_REL: 'rel',
   OC_RSRVD_TITLE: 'title',
   OC_RSRVD_URI: 'anchor',
   OC_RSRVD_MEDIA_TYPE: 'type',
   OC_RSRVD_RESOURCE_TYPE_RDPUBLISH: 'oic.wk.rdpub',
   OC_RSRVD_ACCOUNT_URI: '/oic/account',
   OC_RSRVD_ACCOUNT_SEARCH_URI: '/oic/account/search',
   OC_RSRVD_ACCOUNT_SESSION_URI: '/oic/account/session',
   OC_RSRVD_ACCOUNT_TOKEN_REFRESH_URI: '/oic/account/tokenrefresh',
   OC_RSRVD_ACL_GROUP_URI: '/oic/acl/group',
   OC_RSRVD_ACL_INVITE_URI: '/oic/acl/invite',
   OC_RSRVD_AUTHPROVIDER: 'authprovider',
   OC_RSRVD_AUTHCODE: 'authcode',
   OC_RSRVD_ACCESS_TOKEN: 'accesstoken',
   OC_RSRVD_LOGIN: 'login',
   OC_RSRVD_SEARCH: 'search',
   OC_RSRVD_GRANT_TYPE: 'granttype',
   OC_RSRVD_REFRESH_TOKEN: 'refreshtoken',
   OC_RSRVD_USER_UUID: 'uid',
   OC_RSRVD_GROUP_ID: 'gid',
   OC_RSRVD_MEMBER_ID: 'mid',
   OC_RSRVD_INVITE: 'invite',
   OC_RSRVD_ACCEPT: 'accept',
   OC_RSRVD_OPERATION: 'op',
   OC_RSRVD_ADD: 'add',
   OC_RSRVD_DELETE: 'delete',
   OC_RSRVD_OWNER: 'owner',
   OC_RSRVD_MEMBERS: 'members',
   OC_RSRVD_GRANT_TYPE_REFRESH_TOKEN: 'refresh_token',
   OC_RSRVD_PROV_CRL_URL: '/oic/credprov/crl',
   OC_RSRVD_LAST_UPDATE: 'lu',
   OC_RSRVD_THIS_UPDATE: 'thisupdate',
   OC_RSRVD_NEXT_UPDATE: 'nu',
   OC_RSRVD_SERIAL_NUMBERS: 'rcsn',
   OC_RSRVD_CRL: 'crldata',
   OC_RSRVD_CRL_ID: 'crlid',
   OC_RSRVD_GROUP_URL: '/oic/group',
   OC_RSRVD_ACL_GROUP_URL: '/oic/acl/group',
   OC_RSRVD_ACL_INVITE_URL: '/oic/acl/invite',
   OC_RSRVD_ACL_VERIFY_URL: '/oic/acl/verify',
   OC_RSRVD_ACL_ID_URL: '/oic/acl/id',
   OC_RSRVD_OWNER_ID: 'oid',
   OC_RSRVD_ACL_ID: 'aclid',
   OC_RSRVD_ACE_ID: 'aceid',
   OC_RSRVD_SUBJECT_ID: 'sid',
   OC_RSRVD_REQUEST_METHOD: 'rm',
   OC_RSRVD_REQUEST_URI: 'uri',
   OC_RSRVD_GROUP_MASTER_ID: 'gmid',
   OC_RSRVD_GROUP_TYPE: 'gtype',
   OC_RSRVD_SUBJECT_TYPE: 'stype',
   OC_RSRVD_GROUP_ID_LIST: 'gidlist',
   OC_RSRVD_MEMBER_ID_LIST: 'midlist',
   OC_RSRVD_DEVICE_ID_LIST: 'dilist',
   OC_RSRVD_ACCESS_CONTROL_LIST: 'aclist',
   OC_RSRVD_RESOURCES: 'resources',
   OC_RSRVD_VALIDITY: 'validity',
   OC_RSRVD_PERIOD: 'period',
   OC_RSRVD_RECURRENCE: 'recurrence',
   OC_RSRVD_INVITED: 'invited',
   OC_RSRVD_ENCODING: 'encoding',
   OC_OIC_SEC: 'oic.sec',
   OC_RSRVD_BASE64: 'base64',
   OC_RSRVD_DER: 'der',
   OC_RSRVD_PEM: 'pem',
   OC_RSRVD_RAW: 'raw',
   OC_RSRVD_UNKNOWN: 'unknown',
   OC_RSRVD_DATA: 'data',
   OC_RSRVD_RESOURCE_OWNER_UUID: 'rowneruuid',
   OC_RSRVD_SUBJECT_UUID: 'subjectuuid',
   OC_RSRVD_PERMISSION_MASK: 'permission',
   OC_RSRVD_GROUP_PERMISSION: 'gp',
   OC_RSRVD_GROUP_ACL: 'gacl',
   OC_RSRVD_PROV_CERT_URI: '/oic/credprov/cert',
   OC_RSRVD_CSR: 'csr',
   OC_RSRVD_CERT: 'cert',
   OC_RSRVD_CACERT: 'certchain',
   OC_RSRVD_TOKEN_TYPE: 'tokentype',
   OC_RSRVD_EXPIRES_IN: 'expiresin',
   OC_RSRVD_REDIRECT_URI: 'redirecturi',
   OC_RSRVD_CERTIFICATE: 'certificate',
   COAP_OPTION_ACCEPT_VERSION: 2049,
   COAP_OPTION_CONTENT_VERSION: 2053,
   OC_MASK_SCOPE: 15,
   OC_MASK_MODS: 4080,
   OC_MASK_FAMS: 96,
   CT_ADAPTER_SHIFT: 16,
   CT_MASK_FLAGS: 65535,
   CT_MASK_ADAPTER: 4294901760,
   OC_MASK_RESOURCE_SECURE: 80,
   MAX_SEQUENCE_NUMBER: 16777215,
   MAX_REP_ARRAY_DEPTH: 3,
   OXM_RANDOM_PIN_DEFAULT_SIZE: 8,
   OXM_RANDOM_PIN_DEFAULT_PIN_TYPE: 7,
   OXM_RANDOM_PIN_MIN_SIZE: 4,
   OXM_RANDOM_PIN_MAX_SIZE: 32,
   OXM_PRECONFIG_PIN_MAX_SIZE: 32,
   OXM_PIN_TYPE_COUNT: 3,
   OCCreateResource: [Function: OCCreateResource],
   OCDeleteResource: [Function: OCDeleteResource],
   OCBindResourceHandler: [Function: OCBindResourceHandler],
   OCBindResourceTypeToResource: [Function: OCBindResourceTypeToResource],
   OCBindResourceInterfaceToResource: [Function: OCBindResourceInterfaceToResource],
   OCGetResourceHandler: [Function: OCGetResourceHandler],
   OCBindResource: [Function: OCBindResource],
   OCUnBindResource: [Function: OCUnBindResource],
   OCDoResource: [Function: OCDoResource],
   OCRDDiscover: [Function: OCRDDiscover],
   OCRDPublish: [Function: OCRDPublish],
   OCRDPublishWithDeviceId: [Function: OCRDPublishWithDeviceId],
   OCRDDelete: [Function: OCRDDelete],
   OCCancel: [Function: OCCancel],
   OCRegisterPersistentStorageHandler: [Function: OCRegisterPersistentStorageHandler],
   OCGetResourceUri: [Function: OCGetResourceUri],
   OCGetResourceProperties: [Function: OCGetResourceProperties],
   OCGetResourceHandleFromCollection: [Function: OCGetResourceHandleFromCollection],
   OCGetResourceTypeName: [Function: OCGetResourceTypeName],
   OCGetResourceInterfaceName: [Function: OCGetResourceInterfaceName],
   OCGetResourceHandle: [Function: OCGetResourceHandle],
   OCGetResourceHandleAtUri: [Function: OCGetResourceHandleAtUri],
   OCGetNumberOfResourceInterfaces: [Function: OCGetNumberOfResourceInterfaces],
   OCGetNumberOfResourceTypes: [Function: OCGetNumberOfResourceTypes],
   OCDoResponse: [Function: OCDoResponse],
   OCNotifyListOfObservers: [Function: OCNotifyListOfObservers],
   OCSetDefaultDeviceEntityHandler: [Function: OCSetDefaultDeviceEntityHandler],
   SetDisplayPinWithContextCB: [Function: SetDisplayPinWithContextCB],
   SetInputPinWithContextCB: [Function: SetInputPinWithContextCB],
   SetClosePinDisplayCB: [Function: SetClosePinDisplayCB],
   UnsetInputPinWithContextCB: [Function: UnsetInputPinWithContextCB],
   UnsetDisplayPinWithContextCB: [Function: UnsetDisplayPinWithContextCB],
   UnsetClosePinCB: [Function: UnsetClosePinCB],
   GeneratePin: [Function: GeneratePin],
   SetRandomPinPolicy: [Function: SetRandomPinPolicy],
   OCInit: [Function: OCInit],
   OCStop: [Function: OCStop],
   OCProcess: [Function: OCProcess],
   OCStartPresence: [Function: OCStartPresence],
   OCStopPresence: [Function: OCStopPresence],
   OCRDStart: [Function: OCRDStart],
   OCRDStop: [Function: OCRDStop],
   OCGetNumberOfResources: [Function: OCGetNumberOfResources],
   OCGetServerInstanceIDString: [Function: OCGetServerInstanceIDString],
   OCGetPropertyValue: [Function: OCGetPropertyValue],
   OCSetPropertyValue: [Function: OCSetPropertyValue],
   path: '/home/grl/iotivity-node-random-pin2/build/Release/iotivity.node' }