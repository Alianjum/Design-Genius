function copyReferralLink() {
    var input = document.getElementById('referral-url');
    if (input) {
        input.select();
        input.setSelectionRange(0, 99999);
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(input.value).then(function() {
                showCopySuccess();
            }).catch(function() {
                document.execCommand('copy');
                showCopySuccess();
            });
        } else {
            document.execCommand('copy');
            showCopySuccess();
        }
    }
}

function showCopySuccess() {
    var btn = $('.copy-btn');
    var originalHtml = btn.html();
    btn.html('<i class="bi bi-check me-1"></i> Copied!');
    btn.addClass('btn-success').removeClass('btn-primary');
    
    setTimeout(function() {
        btn.html(originalHtml);
        btn.removeClass('btn-success').addClass('btn-primary');
    }, 2000);
}

$(document).ready(function() {
    $('.copy-btn').on('click', function(e) {
        e.preventDefault();
        copyReferralLink();
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
