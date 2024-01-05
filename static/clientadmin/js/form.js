$('#createportfolio').click(function(e) {
    e.preventDefault();

    var member1 = $('#form-field-member').val();
    console.log(typeof(member1));

    // Mandatory fields
    var memberType = $('#membertype').val();
    var product = $('#form-field-product').val();
    var dataType = $('#form-field-data_type').val();
    var opRights = $('#form-field-op_rights').val();
    var role = $('#form-field-role').val();
    var portfolioName = $('#form-field-portfolio_name').val();
    var portfolioCode = $('#form-field-portfolio_code').val();

    // Check if mandatory fields are not null, undefined or empty
    if (!memberType || !product || !dataType || !opRights || !role || !portfolioName || !portfolioCode) {
        alert('Please select the mandatory fields.');
        return;
    }

    $.ajax({
        type: "POST",
        url: "portfolioadd",
        data: {
            form: "portfolio1",
            member_type: memberType,
            member: JSON.stringify(member1),
            product: product,
            data_type: dataType,
            op_rights: opRights,
            role: role,
            portfolio_name: portfolioName,
            portfolio_code: portfolioCode,
            portfolio_spec: $('#form-field-portfolio_spec').val(),
            portfolio_u_code: $('#form-field-portfolio_u_code').val(),
            portfolio_det: $('#form-field-portfolio_det').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            dataType: "json",
        },
        beforeSend: function() {
            $('#image-container').css("display", "block");
        },
        success: function(data) {
            $('#image-container').css("display", "none");
            $('#portfolio_output').html("");
            $("#portfolio_output").prepend('<div class="col-md-6">' +
                '<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">' +
                '<div class="col p-4 d-flex flex-column position-static">' +
                '<h3 class="mb-auto" style="color:green;" align="center">' + data.resp + '</h3>' +
                '<button type="button" class="btn btn-primary copy-btn" title="' + data.masterlink + '" data-clipboard-text="' + data.masterlink + '">Copy Masterlink</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );


            // Add click event to the copy button
            $('.copy-btn').on('click', function(event) {
                event.preventDefault();  // Prevent default action

                // Extract the tooltip content from the title attribute
                var text = $(this).attr('title');
                var button = $(this);  // Reference to the clicked button

                // Use the navigator.clipboard.writeText method to copy the text
                navigator.clipboard.writeText(text).then(function() {
                    console.log('Text successfully copied to clipboard!');
                    button.text('Copied');  // Change button text to "Copied"
                }).catch(function(err) {
                    console.error('Unable to copy text: ', err);
                });
            });

        },
        failure: function() {
            $('#output').html("Noo")
        }
    });
});


$('#role1').on('submit', function(e){
e.preventDefault();
$.ajax({
    type : "POST",
    url: "addroles",
    data: {
    form:"role1",
    itemlevel1:$('#form-field-itemlevel1').val(),
    itemlevel2:$('#form-field-itemlevel2').val(),
    itemlevel3:$('#form-field-itemlevel3').val(),
    itemlevel4:$('#form-field-itemlevel4').val(),
    itemlevel5:$('#form-field-itemlevel5').val(),
    selectlayerforroles:$('#form-field-selectlayerforroles').val(),
    role_name:$('#form-field-role_name').val(),
    role_code:$('#form-field-role_code').val(),
    role_spec:$('#form-field-role_spec').val(),
    role_u_code:$('#form-field-role_u_code').val(),
    role_det:$('#form-field-role_det').val(),
    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
    // csrfmiddlewaretoken: '{{ csrf_token }}',
    dataType: "json",
    },
    beforeSend: function() {
    $('#image-container').css("display", "block");
  },
    success: function(data){
    $('#image-container').css("display", "none");
    $('#role_output').html("");
    $("#role_output").prepend('<div class="col-md-6">'+
        '<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">' +
            '<div class="col p-4 d-flex flex-column position-static">' +
                '<h3  class="mb-auto" style="color:green;" align="center">' + data.resp + '</h3>' +
            '</div>' +
        '</div>' +
    '</div>'
    )
    },
    failure: function() {
    $('#image-container').css("display", "none");
    $('#output').html("Noo")
    }});});

$('#level').on('submit', function(e){
e.preventDefault();
$.ajax({
    type : "POST",
    url: "addroles",
    data: {
    form:"role1",
    itemlevel1:$('#form-field-itemlevel1').val(),
    itemlevel2:$('#form-field-itemlevel2').val(),
    itemlevel3:$('#form-field-itemlevel3').val(),
    itemlevel4:$('#form-field-itemlevel4').val(),
    itemlevel5:$('#form-field-itemlevel5').val(),
    selectlayerforroles:$('#form-field-selectlayerforroles').val(),
    role_name:$('#form-field-role_name').val(),
    role_code:$('#form-field-role_code').val(),
    role_spec:$('#form-field-role_spec').val(),
    role_u_code:$('#form-field-role_u_code').val(),
    role_det:$('#form-field-role_det').val(),
    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
    // csrfmiddlewaretoken: '{{ csrf_token }}',
    dataType: "json",
    },
    beforeSend: function() {
    $('#image-container').css("display", "block");
  },
    success: function(data){
    $('#image-container').css("display", "none");
    $('#role_output').html("");
    $("#role_output").prepend('<div class="col-md-6">'+
        '<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">' +
            '<div class="col p-4 d-flex flex-column position-static">' +
                '<h3  class="mb-auto" style="color:green;" align="center">' + data.resp + '</h3>' +
            '</div>' +
        '</div>' +
    '</div>'
    )
    },
    failure: function() {
    $('#image-container').css("display", "none");
    $('#output').html("Noo")
    }});});
$('#team_member1').on('submit', function(e){
    e.preventDefault();

    $.ajax({
        type : "POST",
        url: "members",
        data: {
        form:"team_member1",
        type1:$('#type').val(),
        member_name:$('#form-field-member_name').val(),
        member_code:$('#form-field-member_code').val(),
        member_spec:$('#form-field-member_spec').val(),
        member_u_code:$('#form-field-member_u_code').val(),
        member_det:$('#form-field-member_det').val(),
        memberinvitationcheckinput: $('#memberinvitationcheckinput').is(':checked') ? 'checked' : 'not_checked',
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',
        dataType: "json",
        },
        beforeSend: function() {
    $('#image-container').css("display", "block");
  },
        success: function(data){
        $('#image-container').css("display", "none");
        $('#invitation_link_member').html("");
        $('#invitation_link_member').html(data.link)
        },
        failure: function() {
        $('#output').html("Noo")
        }});});

$('#guest_member1').on('submit', function(e){
    e.preventDefault();

    $.ajax({
        type : "POST",
        url: "members",
        data: {
        form:"guest_member1",
        type1:$('#type').val(),
        user_name:$('#form-field-user_name').val(),
        user_code:$('#form-field-user_code').val(),
        user_spec:$('#form-field-user_spec').val(),
        user_u_code:$('#form-field-user_u_code').val(),
        user_det:$('#form-field-user_det').val(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',
        dataType: "json",
        },
        beforeSend: function() {
    $('#image-container').css("display", "block");
  },
        success: function(data){
        $('#image-container').css("display", "none");
        $('#invitation_link_guest').html("");
        $('#invitation_link_guest').html(data.link)
        },
        failure: function() {
        $('#output').html("Noo")
        }});});

$('#lavinumber').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        type : "POST",
        url: "members",
        data: {
        form:"lavimember",
        type1:$('#type').val(),
        public_name:$('#form-field-public_name').val(),
        autopublic:$('#form-field-autopublic').val(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',

        dataType: "json",
        },
        beforeSend: function() {
    $('#image-container').css("display", "block");
  },
        success: function(data){
        $('#image-container').css("display", "none");
        console.log(data)
        $('#invitation_link_public1').html("");
        $('#invitation_link_public2').html("");
        $('#invitation_link_public1').html(data.public_name);
        $('#invitation_link_public2').html(data.autopublic);
        },

        failure: function() {
        $('#output').html("Noo")
        }});});


$('#emailsent').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        type : "POST",
        url: "invitemembers",
        data: {
        form:"temailsent",
        email:$('#form-field-emailmember').val(),
        link:$('#invitation_link_member').text(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',

        dataType: "json",
        },
        beforeSend: function() {
    $('#image-container').css("display", "block");
  },
        success: function(data){
        $('#image-container').css("display", "none");
        $('#msg').html("");
        $('#msg').html(data.msg);
        },

        failure: function() {
        $('#output').html("Noo")
        }});});
$('#gemailsent').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        type : "POST",
        url: "invitemembers",
        data: {
        form:"gemailsent",
        email1:$('#form-field-emailuser').val(),
        link1:$('#invitation_link_guest').text(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',

        dataType: "json",
        },
        beforeSend: function() {
    $('#image-container').css("display", "block");
  },
        success: function(data){
        $('#image-container').css("display", "none");
        $('#msg1').html("");
        $('#msg1').html(data.msg);
        },

        failure: function() {
        $('#output').html("Noo")
        }});});

$('#gemailsent1').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        type : "POST",
        url: "importmembers",
        data: {
        form:"ImportUsers",
        datalink:$('#form-field-teammembercommoninvitationdata').val(),
        memtype:$('#memtype').val(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',

        dataType: "json",
        },
        success: function(data){
        $('#form-field-teammembercommoninvitationlink').value(data.userlink);
        $('#datalink').value(data.datalink);
        },

        failure: function() {
        $('#output').html("Noo")
        }});});
$('#gemailsent2').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        type : "POST",
        url: "invitemembers",
        data: {
        form:"gemailsent",
        email1:$('#form-field-emailuser').val(),
        link1:$('#invitation_link_guest').text(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        // csrfmiddlewaretoken: '{{ csrf_token }}',

        dataType: "json",
        },
        beforeSend: function() {
    $('#image-container').css("display", "block");
  },
        success: function(data){
        $('#image-container').css("display", "none");
        $('#msg1').html("");
        $('#msg1').html(data.msg);
        },

        failure: function() {
        $('#output').html("Noo")
        }});});