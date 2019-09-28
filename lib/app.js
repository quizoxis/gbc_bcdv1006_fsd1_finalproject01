// app.js - Main application

function getEthBalance() {
    let  wei, balance;

    // let ethAddress = "0x864705E03b68A035CE867cfA2EbAecA1Fe9E9995";
    let ethAddress = $("#modal-getethbalance #formGroupEthAddress").val().trim();

    try {
        web3.eth.getBalance(ethAddress, function (error, wei) {
            if (!error) {
                let balanceValue = web3.fromWei(wei, 'ether');
                //elementSetText('frmInputEthAddress',balanceValue);
                //elementSetText('ethBalance', balanceValue);
                console.log('Balance: ' + balanceValue);
            }
        });
    } catch (err) {
        // document.getElementById("frmInputEthAddress").innerHTML = err;
        console.log(err);
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


    $("#modal-welcome").modal("show");

    // Setup About Show Modal
    $('#modal-about').on('show.bs.modal', function (e) {
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

    // Progress Bar Handling
    var bar = $('.progress-bar');
    var percent = $('.progress-bar');
    var status = $('#status');

    $('#formGetEthBalance').submit(function(e){
        e.preventDefault();
        getEthBalance();
    });

    $('#modal-getethbalance').on('show.bs.modal', function (e) {

        status.empty();
        status.html("Please enter Ethereum Address to fetch its balance");

        var percentValue = '50%';
        bar.width(percentValue);
        percent.html(percentValue);


        $('#test').toggleClass('disabled');


    });


});
