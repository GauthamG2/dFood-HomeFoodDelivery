// Data that can be sent
/**
 * isDialog: true/false,
 * title: tilte to be displayed
 * description: a small description
 * negativebtnText: text for the negative button,
 * positivebtnText: text for the positive button,
 */

var value;
var popupId;

$(document).on('popupbeforeposition', '#alert_dialog', function(event,ui){
    var dialogParams = $(this).data('dialog-params');
    popupId =  $(this).data('id');
    console.log(popupId);
    if(dialogParams.isDialog === true){
        renderDialogBoxElements(dialogParams);
    }else{
        renderAlertBoxElements(dialogParams);
    }
});


function renderAlertBoxElements(dialogParams){
    $('#title').text(dialogParams.title);
    $('#description').text(dialogParams.description);
    $('#dialog-block').hide();
    $('.alert-button').show();
    $('.alert-button').prop('text',dialogParams.positivebtn);
}

function renderDialogBoxElements(dialogParams){
    $('#title').text(dialogParams.title);
    $('#description').text(dialogParams.description);
    $('.negative-button').html(dialogParams.negativebtn);
    $('.positive-button').html(dialogParams.positivebtn);
    $('#dialog-block').show();
    $('.alert-button').hide();
}

function onDialogBtnsClicked(val){
    window.parent.handleDialogResult({'id': popupId, 'value': val});
    $('#alert_dialog').popup('close');
}

function onOKbtnClicked(){
    $('#alert_dialog').popup('close');
}