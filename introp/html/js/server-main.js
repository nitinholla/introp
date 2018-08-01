(function($) {
	"use strict"
	var isSecuredMode = false;
	var RestAddr;
	///////////////////////////
	
	$(window).on('load', function() {
		$("#preloader").delay(100).fadeOut();
		$(document).ajaxStart(function () {
			// Show image container
			$("#preloader").show();
		});
		$(document).ajaxComplete(function () {
			// Hide image container
			setTimeout(function(){
			$("#preloader").hide();
			$('#loaderInfoText').html(' ');
		},1000);
		});

	});
	var prodContainerScroll,controlModalLabelScroll,addNewContentScroller;

	$(document).ready(function(){		
		prodContainerScroll = new iScroll('scroller',{vScroll: false, hScrollbar:true, bounce:false, lockDirection:true});		
		loadDeviceList();
		//RestAddr = "http://127.0.0.1:8081";
		RestAddr = $(location).attr('href').split(":8080")[0]+":8081";
		console.log(RestAddr);	

		

		var nw_Data = null;

		setTimeout(function(){			
			getNwkValues();
		},1000);

		$('.nw-icons').click(function() {
			if (nw_Data === null){
				getNwkValues();
			}
		});


		function getNwkValues(){
			$.ajax({
				url: RestAddr+"/getNetworkDetails",
				crossDomain: true,
				type: "POST",
				dataType: "JSON",
				async: true,
				success: function (data, status) {
					console.log('success', data.ethernet);
					
					$('#ethernet-icon').popover({
						'html':true,
						'content': "<b>Physical Addr: </b>"+data.ethernet.HWaddr+"<br><b>IP Addr:</b>"+data.ethernet.IP
					});
					$('#wifi-icon').popover({
						'html':true,
						'content': "<b>Physical Addr: </b>"+data.wifi.HWaddr+"<br><b>IP Addr:</b>"+data.wifi.IP
					});
					$('#bt-icon').popover({
						'html':true,
						'content': "<b>Physical Addr: </b>"+data.bluetooth.HWaddr
					});
					nw_Data = data;
				},
				error: function (xhr, text_status) {
					console.log(xhr, text_status);
					nw_Data = null;
					
				},
			});

		}
		
	});

	var jsonDevList = {}
	function loadDeviceList(){
		$.getJSON("device-details.json", function (data) {
			$.each(data, function (index, value) {
				jsonDevList[index] = value; 
				var devElem = '<div class="device" data-new-deviceId = "'+index+'">'+
				'<div class="device-icon inactive '+value.icon+'"></div>'+
				'<div class="device-name"><h3>'+value.name+'</h3></div>'+
				'<div class="connect-btn"><button class="btn btn-blue">Add</button></div></div>'
				$('#add-new .modal-body').append(devElem);
			   //console.log(index,value);
			});
		});
	}


	// // Btn nav collapse
	// $('#nav .nav-collapse').on('click', function() {
	// 	$('#nav').toggleClass('open');
	// });

	// ///////////////////////////
	// // Mobile dropdown
	// $('.has-dropdown a').on('click', function() {
	// 	$(this).parent().toggleClass('open-drop');
	// });


	//Calander in page
	const d = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	document.getElementById("date").innerHTML = d.getFullYear() + ", " + monthNames[d.getMonth()] + " " + d.getDate() + ",  " + days[d.getDay()];	


	//Range Slider
	function initRangeSlider() {
		var $document = $(document);
		var selector = '[data-rangeslider]';
		var $inputRange = $(selector); /** * Example functionality to demonstrate a value feedback * and change the output's value. */
		function valueOutput(element) {
			var value = element.value;
			var output = element.parentNode.getElementsByTagName('output')[0];
			output.innerHTML = value;
		} /** * Initial value output */
		for (var i = $inputRange.length - 1; i >= 0; i--) {
			valueOutput($inputRange[i]);
		}; /** * Update value output */
		$document.on('input', selector, function(e) {
			valueOutput(e.target);
		}); /** * Initialize the elements */
		$inputRange.rangeslider({
			polyfill: false
		}); /** * Example functionality to demonstrate programmatic value changes */
		$document.on('click', '#js-example-change-value button', function(e) {
			var $inputRange = $('[data-rangeslider]', e.target.parentNode);
			var value = $('input[type="number"]', e.target.parentNode)[0].value;
			$inputRange.val(value).change();
		}); /** * Example functionality to demonstrate programmatic attribute changes */
		$document.on('click', '#js-example-change-attributes button', function(e) {
			var $inputRange = $('[data-rangeslider]', e.target.parentNode);
			var attributes = {
				min: $('input[name="min"]', e.target.parentNode)[0].value,
				max: $('input[name="max"]', e.target.parentNode)[0].value,
				step: $('input[name="step"]', e.target.parentNode)[0].value
			};
			$inputRange.attr(attributes).rangeslider('update', true);
		}); /** * Example functionality to demonstrate destroy functionality */
		$document.on('click', '#js-example-destroy button[data-behaviour="destroy"]', function(e) {
			$('input[type="range"]', e.target.parentNode).rangeslider('destroy');
		}).on('click', '#js-example-destroy button[data-behaviour="initialize"]', function(e) {
			$('input[type="range"]', e.target.parentNode).rangeslider({
				polyfill: false
			});
		});
	};



	//Window Size in console
	window.onresize = displayWindowSize;
	function displayWindowSize() {
		console.log(window.innerWidth + "x" + window.innerHeight);
	};


	//Create Devices
	$('#add-new').on('click', '.connect-btn .btn', function () {
		var newDevId = $(this).closest('.device').attr("data-new-deviceId");
		console.log(newDevId);
		$('#loaderInfoText').html('Addind New Device');
		$.ajax({
			url: RestAddr+"/CreateResource",
			crossDomain: true,
			type: "POST",
			data: { 'deviceType': newDevId },
			dataType: "JSON",
			async: true,
			success: function (data, status) {
				console.log('success', data);
				$('#loaderInfoText').html('Device Added');
			},
			error: function (xhr, text_status) {
				console.log(xhr, text_status);
			},
		});
	});

	//////////////////////getValuesOfResources//////////////////
	var DiscoveredDeviceList = {};
	var ResourcesOfDeviceList = {};	
	var selectedClient;
	var cardHtmlRootNode = '<div class="inactive dev-card"><a href="#" title="Delete Device" class="delete-icon" style="float:right; padding:15px; margin:-15px"><i class="fa fa-times-circle" ></i></a>';
	var cardHtmlaModalNode = '<a href="#" data-toggle="modal" data-target="#control-modal" class="text-black">';
	var cardHtmlProdContainerDiv = '<div class="product-container">';
	var cardHtmlProdImgDiv = '<div class="pro-img">';
	var cardHtmlName = '<h3>';
	var cardHtmlDescription = '<span>';

	var tabHtmlRadio = '<input type="radio" name="tabs" data-device-type-radio="">';
	var tabHtmlLabel = '<label class="dev-tab-label">';
	var tabHtmlProfImgDiv = '<div class="cricle-bg inactive" data-device-type-tab="">';
	var tabHtmlNameNode = "<p>";
	//Discover on model Show
	$("#add-new").on('shown.bs.modal', function () {
		addNewContentScroller = new iScroll('add-new-content-scroller',{vScroll: true, hScrollbar:false,vScrollbar:true, bounce:true, lockDirection:true});						
	});
	 $("#add-new").on('hidden.bs.modal', function () {	
		//var counters = {'oic.d.ac':0,'oic.d.light':0,'oic.d.fan':0,'oic.d.stb':0};
		var counters = {};
		$.each(jsonDevList, function(index,value){
			counters["oic.d."+index] = 0;			
		});
		DiscoveredDeviceList = {};
		$('#loaderInfoText').html('Discovering Resources');
		$('#grid-container').html(' ');
		$('#dev-tabs').html(' ');
		$('#dev-components').html(' ');
		$.ajax({
			url: RestAddr+"/DiscoverResource",
			crossDomain: true,
			type: "POST",
			data: { 'addressType':  'd_u'},
			dataType: "JSON",
			success: function (data, status) {
				console.log('success - Raw Return Data of Discover Device', data)
				var i;
				for (i = 0; i < data.length - 1; i++) {
					var id = data[i].payload.values.di;
					if(!("iopb.com.iotivity.proc_id" in data[i].payload.values)){
						continue;
					}
					//var rt_ = data[i].payload.values.rt_;
					var rt_ = data[i].payload.types[1];
					DiscoveredDeviceList[id] = data[i];
					var icon, name, description;
					var card_size = 'sml-pro'; // Default card size 
					var controls_template = 'onlyMasterSwitch.html';
					description = "Main Room";
					console.log('rt_', rt_);
					var splicedDevName = rt_.split(".d.")[1];
					if (splicedDevName in jsonDevList){
						icon = jsonDevList[splicedDevName].icon;
						name = jsonDevList[splicedDevName].name;
						if("card_size" in jsonDevList[splicedDevName]){
							if(jsonDevList[splicedDevName].card_size === 'm'){
							card_size = 'md-pro'; 
							}
						}						
					}
					else {
						icon = 'icon-fan';
						name = rt_;
					}

					if (splicedDevName === "ac"){
						controls_template = 'ac.html';
					}

					counters[rt_]++;
					name = (name+'_'+counters[rt_].toString());
					//Build Card
					var node1 = $(cardHtmlRootNode).attr('id', id).addClass(card_size);
					var node2 = $(cardHtmlaModalNode);
					var node3 = $(cardHtmlProdContainerDiv);
					var node4 = $(cardHtmlProdImgDiv).addClass(icon);
					var node5 = $(cardHtmlName).html(name);
					var node6 = $(cardHtmlDescription).html(description);

					node3.append(node4, node5,node6);
					node2.html(node3);
					node1.append(node2)
					node1.append('<a href="#" title="OTM Reset" class="otm-icon" style="float: right;padding: 15px;margin-top: -31px;margin-left: -19px;margin-bottom: -19px;margin-right: -13px;"><i class="fa fa-refresh" style=""></i></a>');
					$('#grid-container').append(node1);

					//Buid Tab
					var tabNode1 = $(tabHtmlRadio).attr('data-device-type-radio',id);
					var tabNode2 = $(tabHtmlLabel);
					var tabNode3 = $(tabHtmlProfImgDiv).addClass(icon).attr('data-device-type-tab',id);
					var tabNode4 = $(tabHtmlNameNode).html(name);
					
					tabNode2.append(tabNode3);									
					tabNode2.append(tabNode4);
					$('#dev-tabs').append(tabNode1);
					$('#dev-tabs').append(tabNode2);

					//Build controls
					renderControls(controls_template,id);						

					setTimeout(function(){
						var pinMenu = $('#pin-select-menu').clone();						
						$('.pin-menu').html(pinMenu.html());
					},1000);

				}
				console.log("Discovered Device", DiscoveredDeviceList);
				//Just for demo
				$('#grid-container').append('<div class="sml-pro bg-light"></div> \
				<div class="sml-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="sml-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>\
				<div class="md-pro bg-light"></div>')

				setTimeout(function () {					
					var actualWidth = $('#grid-container').actual( 'width' ,{ clone : true });
					console.log(actualWidth);
					$('#grid-container').css('width',actualWidth);
					prodContainerScroll.refresh();									
				}, 100);

				setTimeout(function(){
					initRangeSlider();
				},1000);
				
				//getResources();
			},
			error: function (xhr, text_status) {
				console.log(xhr, text_status)
			},
		});
	});

	function renderControls(file,id){
		$.get('templates/'+file, function (data) {
			var rawHtmlData = $.parseHTML(data);
			rawHtmlData = $(rawHtmlData).attr('data-device-type', id);
			$('#dev-components').append(rawHtmlData);
		});
	}

	function getResources(devId) {		
		$('#loaderInfoText').html('Acquiring Device Resources');
		$.ajax({
			url: RestAddr+"/DiscoverResource",
			crossDomain: true,
			type: "POST",
			data: { 'addressType': 'r', "destinationAddr": JSON.stringify(DiscoveredDeviceList[devId].addr) },
			dataType: "JSON",
			async: false,
			success: function (data, status) {
				//console.log('success', data)
				var i;
				ResourcesOfDeviceList[devId] = [];
				var uriResourcesCount = data[0].payload.resources.length;
				var countToParse = 7;
				if(isSecuredMode){
					countToParse = 10;
				}
				for (i = countToParse; i < uriResourcesCount; i++) {
					ResourcesOfDeviceList[devId].push(data[0].payload.resources[i]);
				}
				console.log("ResourcesOfDeviceList",ResourcesOfDeviceList);
				getValuesOfResources(devId);
			},
			error: function (xhr, text_status) {
				console.log(xhr, text_status)
			},
		});

	}


	var getDataOfResources = {};
	//Discover on model Show
	function getValuesOfResources(devId) {		
		$('#loaderInfoText').html('Acquiring Resource Values (get)');		
		var __valuesDict = {};
		var eachRes;
		for (eachRes in ResourcesOfDeviceList[devId]) {
		//alert(devId);
		//console.log('uri:'+ResourcesOfDeviceList[originalDeviceId][eachRes].uri+' devAddr:'+ JSON.stringify(DiscoveredDeviceList[originalDeviceId].addr));			
			var _data = '';
			if (isSecuredMode == false) {
				//alert("isSecured");
				_data = { 'uri': ResourcesOfDeviceList[devId][eachRes].uri, 'devAddr': JSON.stringify(DiscoveredDeviceList[devId].addr) };
			}
			else {
				//Secured
				//alert("unsecured");
				_data = { 'uri': "coaps://" + ResourcesOfDeviceList[devId][eachRes].eps[0].addr + ":" + ResourcesOfDeviceList[devId][eachRes].eps[0].port + ResourcesOfDeviceList[devId][eachRes].uri, 'devAddr': 'null' };
			}
			$.ajax({
				
				url: RestAddr+"/Getdata",
				crossDomain: true,
				type: "POST",
				//Secured
				data: _data,
				dataType: "JSON",
				async: true,
				success: function (data, status) {
					console.log('success', data);
					__valuesDict[ResourcesOfDeviceList[devId][eachRes].uri] = data;
					__valuesDict[ResourcesOfDeviceList[devId][eachRes].uri]['rt_'] = ResourcesOfDeviceList[devId][eachRes].types[0];
					if (ResourcesOfDeviceList[devId][eachRes].types[0] === "oic.r.switch.binary"){
						$('[data-device-type="'+devId+'"]').find('.master-switch').prop('checked',data.payload.values.value);
						$('[data-device-type="'+devId+'"]').find('.master-switch').trigger("change");
					}
					if (ResourcesOfDeviceList[devId][eachRes].types[0] === "oic.r.temperature"){
						$('[data-device-type="'+devId+'"]').find('input[type="range"]').val(data.payload.values.temperature).change();
					}
				},
				error: function (xhr, text_status) {
					console.log(xhr, text_status)
				},
			});
		}
		getDataOfResources[devId] = __valuesDict;
		//alert("DataOfResources"+getDataOfResources);
		console.log("DataOfResources",getDataOfResources);
	};

	$('#control-modal').on('click', '.update-btn', function () {
		$('#loaderInfoText').html('Updating Resource Values (put)');		

		var devSection = $(this).closest('section');
		var devId = $("input[name='tabs']:checked").attr('data-device-type-radio');		
		var switchVal = $(devSection).find('.master-switch').is(":checked");
		console.log(switchVal);
		
		var tempValue = $(devSection).find('input[type="range"]').val();
		for (var eachRes in getDataOfResources[devId]) {
			
			var destAddr = JSON.stringify(getDataOfResources[devId][eachRes].addr);
			var resUri = getDataOfResources[devId][eachRes].resourceUri;
			var payloadVal = getDataOfResources[devId][eachRes].payload.values;
			if (getDataOfResources[devId][eachRes].rt_ === "oic.r.switch.binary") {
				payloadVal.value = switchVal;
			}
			if (getDataOfResources[devId][eachRes].rt_ === "oic.r.temperature") {
				payloadVal.temperature = tempValue;
			}


			$.ajax({
				url: RestAddr+"/Putdata",
				crossDomain: true,
				type: "POST",
				data: { 'uri': resUri, 'devAddr': destAddr, updatedValues: JSON.stringify(payloadVal) },
				dataType: "JSON",
				async: false,
				success: function (data, status) {
					console.log('success', data);
				},
				error: function (xhr, text_status) {
					console.log(xhr, text_status)
				},
			});
		}

	});


	//Dynamic Changes in Html

	$("#grid-container").on("click",".text-black",function(){
		console.log($(this));
		var devId = $(this).parent().attr('id');
		//console.log($(this).attr('id'));
		$("[data-device-type-radio="+devId+"]").prop('checked', true);
		getResources(devId);
		$('[data-device-type="'+devId+'"]').css("display",'block');	
		initRangeSlider();		
		
	});
	$("#grid-container").on("click",".delete-icon",function(e){
		e.stopPropagation();
		alert("Delete Device, Feature under development");
	});

	$("#grid-container").on("click",".otm-icon",function(e){
		e.stopPropagation();
		alert("OTM Reset, Feature under development");
	});

	$("#control-modal").on('hidden.bs.modal', function () {
		var devId = $("input[name='tabs']:checked").attr('data-device-type-radio');	
		$('[data-device-type="'+devId+'"]').css("display",'none');
		controlModalLabelScroll.destroy();
		controlModalLabelScroll = null;
	});
	$("#control-modal").on('shown.bs.modal', function () {
		var devId = $("input[name='tabs']:checked").attr('data-device-type-radio');
		var divTabActualWidth = Object.keys(DiscoveredDeviceList).length * 95;
		
		$('#dev-tabs').css('width',divTabActualWidth);
		controlModalLabelScroll = new iScroll('labelScroller',{vScroll: false, hScrollbar:false, bounce:true, lockDirection:true});				
		controlModalLabelScroll.scrollToElement('[data-device-type-tab="'+devId+'"]', 100);
	});

	$("#dev-tabs").on('change','input[type=radio][name=tabs]',function() {	
		$("[data-device-type]").css('display','none');
		var devId = $(this).attr('data-device-type-radio');
		getResources(devId);
		$('[data-device-type="'+devId+'"]').css("display",'block');
		initRangeSlider();
	});

	$('#dev-components').on('change','.master-switch',function(){
		if ($(this).is(":checked")) {
			var devId = $("input[name='tabs']:checked").attr('data-device-type-radio');
			$('[data-device-type-tab="' + devId + '"]').removeClass('inactive').addClass('active');
			$('[id="' + devId + '"]').removeClass('inactive').addClass('active');
			var pin = $('[data-device-type="'+devId+'"]').find('.pin-selection :selected').val();			
			setGpio(pin,true);

		}
		else{
			var devId = $("input[name='tabs']:checked").attr('data-device-type-radio');
			$('[data-device-type-tab="' + devId + '"]').removeClass('active').addClass('inactive');
			$('[id="' + devId + '"]').removeClass('active').addClass('inactive');
			var pin = $('[data-device-type="'+devId+'"]').find('.pin-selection :selected').val();			
			setGpio(pin,false);


		}

	});

	$('#dev-tabs').on('click','.dev-tab-label',function(){		
		$(this).prev().prop('checked',true);
		$(this).prev().trigger("change");
	});
	$('#dev-components').on('click','label.tgl-btn',function(){	
		if($(this).prev().is(":checked")){
			$(this).prev().prop('checked',false);
		}
		else{
			$(this).prev().prop('checked',true);
		}
		$(this).prev().trigger("change");
	});


	$('.hamburger').click(function() {
		document.getElementById("mySidenav").style.width = "250px";
	});

	
	$('.navclosebtn').click(function(){
		document.getElementById("mySidenav").style.width = "0";
	});

	$('#dev-components').on('change','.pin-selection',function(){
		var portNo = $(this).val();
		//console.log(portNo);
		if($(this).val() === '0'){ return; }
		//$('.pin-selection [value="'+$(this).val()+'"]').attr('disabled','disabled');
		var devId = $("input[name='tabs']:checked").attr('data-device-type-radio');
		var isAlreadyChecked = $('[data-device-type="'+devId+'"]').find('.master-switch').is(':checked');
		//console.log(isAlreadyChecked);
		setGpio(portNo,isAlreadyChecked);

	});

	function setGpio(portno,val){	
		if(portno === '0'){return}
		console.log(portno,val);
		var _val = val;
		if (['17','18','19','20','21'].indexOf(portno) !== -1){
			if (val === false){
				_val = '01';
			}
			else{
				_val = '00';
			}
		}
		else{
			if (val === false){
				_val = '00';
			}
			else{
				_val = '01';
			}
		}
		$.ajax({
			url: RestAddr+"/setGpio",
			crossDomain: true,
			type: "POST",
			data: { 'portNo': portno , "gval": _val },
			dataType: "JSON",
			async: true,
			success: function (data, status) {
				console.log('success', data);
				$('#loaderInfoText').html('GPIO Value Set');
			},
			error: function (xhr, text_status) {
				console.log(xhr, text_status);
			},
		});
	}
	

})(jQuery);

