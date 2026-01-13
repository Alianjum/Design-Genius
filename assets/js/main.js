$(document).ready(function() {
    $('.copy-btn').on('click', function() {
        var input = $(this).siblings('input');
        input.select();
        document.execCommand('copy');
        
        var originalText = $(this).text();
        $(this).text('Copied!');
        
        setTimeout(function() {
            $('.copy-btn').text(originalText);
        }, 2000);
    });

    $('.mobile-toggle').on('click', function() {
        $('.sidebar').toggleClass('show');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.sidebar, .mobile-toggle').length) {
            $('.sidebar').removeClass('show');
        }
    });

    $('form').on('submit', function() {
        var btn = $(this).find('button[type="submit"]');
        btn.prop('disabled', true);
        btn.html('<span class="spinner-border spinner-border-sm me-2"></span>Loading...');
    });

    setTimeout(function() {
        $('.alert').fadeOut();
    }, 5000);
});
