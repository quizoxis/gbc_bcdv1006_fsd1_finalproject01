// app.js - Main application

// Global Variables
let web3Config = {apiName: 'infura.io', projectId: '3efa734f2110411f9f485fcda5a5ea96', apiUrl: 'https://ropsten.infura.io/v3/' }
let etherScanConfig = {apiName: 'etherscan', apiKey: 'BVU8T8M96TYVMHMGCMDQFXMC9ZYMX4XFEX', apiUrl: 'https://api.etherscan.io/api'}

// EtherScan - General Stats - Get Total Supply of Ether
function etherScanTotalEtherSupply() {
    var apiUrl, result;

    apiUrl = etherScanConfig.apiUrl + '?module=stats&action=ethsupply&apikey=' + etherScanConfig.apiKey;

    fetch(apiUrl).then(async response => {
        return response.json();

    }).then((json)=>{
        result = '<b>Total:&nbsp;</b><em>' + json.result / 1000000000000000000 + '</em>';
        $('#toast-body-text-etherScanTotalEtherSupply').html(result);
    });
}

// EtherScan - General Stats - Get ETHER Last Price
function etherScanGetEtherLastPrice() {
    var apiUrl, result;

    apiUrl = etherScanConfig.apiUrl + '?module=stats&action=ethprice&apikey=' + etherScanConfig.apiKey;

    fetch(apiUrl).then(async response => {
        return response.json();

    }).then((json)=>{
        result = '<b>Bitcoin:&nbsp;</b><em>' + json.result.ethbtc + '</em>&nbsp;&nbsp;&nbsp;&nbsp;';
        result += '<b>U.S. Dollars:&nbsp;</b><em>$' + json.result.ethusd + '</em>';
        $('#toast-body-text-etherScanGetEtherLastPrice').html(result);
    });
}

function refreshToasters() {

    etherScanTotalEtherSupply();
    etherScanGetEtherLastPrice();
}


function getEthBalance() {
    var  wei, balance, result, ethAddress, balanceValue;

    // let ethAddress = "0x864705E03b68A035CE867cfA2EbAecA1Fe9E9995";
    ethAddress = $("#modal-getethbalance #formGroupEthAddress").val().trim();

    try {
        web3.eth.getBalance(ethAddress, function (error, wei) {
            if (!error) {
                balanceValue = web3.fromWei(wei, 'ether');
                console.log('Eth Balance:' + balanceValue);
                result = '<b>Address:&nbsp;</b><em>' + ethAddress + '</em>';
                result += '<p><b>Balance:&nbsp;</b><em>' + balanceValue + '</em></p>';
                $('#toast-body-text-etherAddressBalance').html(result);
            }
        });
    } catch (err) {
        console.log('getEthBalance: error: ' + err);
        result += '<p>Error:' + err + '</p>';
        $('#toast-body-text-etherAddressBalance').html(result);
    }
}

// Main App
$(document).ready(function () {

    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider(web3Config.apiurl + web3Config.projectId));
    }

    // Welcome Modal -  Close Event Handling
    $('#modal-welcome').on('hide.bs.modal', function (e) {
        $('#toast-etherScanTotalEtherSupply').toast({
            autohide: false,
            delay: 5000
        });
        $('#toast-etherScanTotalEtherSupply').toast('show');

        $('#toast-etherScanGetEtherLastPrice').toast({
           autohide: false,
           delay: 5000
        });
        $('#toast-etherScanGetEtherLastPrice').toast('show');

        // Refresh Toasters
        refreshToasters();
    });



    // Setup About Show Modal
    $('#modal-about').on('shown.bs.modal', function (e) {
        $.ajax({
            url: "data/about.json",
            type: 'GET',
            success: function (result,status,xhr) {
                var output = '<h3>Student Information:</h3><ul>';
                for (var i in result) {
                    output += '<li>Id: ' + result[i].id + '</li>';
                    output += '<li>Name: ' + result[i].name + '</li>';
                    output += '<li>Email: ' + result[i].email + '</li>';
                    output += '<li>Title: ' + result[i].title + '</li>';
                    output += '<li>Due: ' + result[i].duedate + '</li>';
                };
                output += '</ul>';

                $("#modal-body-about").html(output);
                $("#modal-about").modal('show');
            }
        });
    });

    // Get Ethereum Balance Form Submit
    $('#modal-getethbalanc-submit').click(function(e){
        e.preventDefault();

        // Close Modal
        $('#modal-getethbalance').modal('hide')

        // Show Toaster for Ethererum Balance
        $('#toast-etherAddressBalance').toast({
            autohide: false,
            delay: 5000
        });
        $('#toast-etherAddressBalance').toast('show');

        // Fetch Ethererum Balance
        getEthBalance();
    });

    $("#modal-welcome").modal("show");

});
