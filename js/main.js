let interval;
let ele_alert = $('#alert').get(0);

/**
 * カウントの表示
 */
const countDisplay = function(_time) {
    if (_time >= 0) {
        $('#count').text(_time);
    }
}

/**
 * カウントの処理
 * 1秒ずつ減っていく
 */
const countTimes = function(_time) {
    countDisplay(_time);

    return new Promise(function(resolve, reject) {
        interval = setInterval( function() {
            _time--;
            if (_time < 0) {　
                clearInterval(interval);
                resolve(true);
            }
            countDisplay(_time);
        }, 1000);
    });
}

/**
 * ポモドーロ本体
 */
const pomodoro = async function(_workTime, _breakTime, _round, _longBreakTime, _set) {
    let result;
    for (let set = 1; set <= _set; set++) {
        for (let round = 1; round <= _round; round++) {
            if (round < _round) {
                // 作業
                result = await countTimes(_workTime * 1);
                ele_alert.play();
                alert('時間です。休憩してください。');
                // 休憩
                result = await countTimes(_breakTime * 1);
                ele_alert.play();
                alert('時間です。作業再開してください。');
            } else {
                // 作業
                result = await countTimes(_workTime * 1);
                ele_alert.play();
                alert('時間です。長い休憩をしてください。');
                // 長い休憩
                result = await countTimes(_longBreakTime * 1);
                ele_alert.play();
                if (set < _set) {
                    alert('時間です。作業を再開してください。');
                } else {
                    alert('すべてのセットが終了しました。ポモドーロを終了します。');
                }
            }
        }
    }

    $('#stop').prop('disabled', true);
    $('#stop').css({
        'color': '#cccccc',
        'background-color': '#f5f5f5'
    });

    $('#start').prop('disabled', false);
    $('#start').css({'opacity': '1'});
}


/**
 * プログレスバーを移動時
 * (Web用)
 */
$('#work-input').on('mousemove', function () {
    $('#work-disp').text($('#work-input').val());
})

$('#round-input').on('mousemove', function () {
    $('#round-disp').text($('#round-input').val());
})

$('#break-input').on('mousemove', function () {
    $('#break-disp').text($('#break-input').val());
})

$('#longbreak-input').on('mousemove', function () {
    $('#longbreak-disp').text($('#longbreak-input').val());
})

$('#set-input').on('mousemove', function () {
    $('#set-disp').text($('#set-input').val());
})

/**
 * プログレスバーを移動時
 * (スマホ用)
 */
$('#work-input').on('touchmove', function () {
    $('#work-disp').text($('#work-input').val());
})

$('#round-input').on('touchmove', function () {
    $('#round-disp').text($('#round-input').val());
})

$('#break-input').on('touchmove', function () {
    $('#break-disp').text($('#break-input').val());
})

$('#longbreak-input').on('touchmove', function () {
    $('#longbreak-disp').text($('#longbreak-input').val());
})

$('#set-input').on('touchmove', function () {
    $('#set-disp').text($('#set-input').val());
})

/**
 * スタートボタン押下時
 */
$('#start').click( function() {

    let workTime = Number($('#work-input').val());
    if (workTime < 1 || isNaN(workTime)) {
        alert("「作業時間（分）」は1以上の数値を設定してください。");
        return false;
    }

    let breakTime = Number($('#break-input').val());
    if (breakTime < 1 || isNaN(breakTime)) {
        alert("「休憩時間（分））」は1以上の数値を設定してください。");
        return false;
    }

    let round = Number($('#round-input').val());
    if (round < 1 || isNaN(round)) {
        alert("「作業回数」は1以上の数値を設定してください。");
        return false;
    }

    let longBreakTime = Number($('#longbreak-input').val());
    if (longBreakTime < 1 || isNaN(longBreakTime)) {
        alert("「長い休憩時間（分）」は1以上の数値を設定してください。");
        return false;
    }

    let set = Number($('#set-input').val());
    if (set < 1 || isNaN(set)) {
        alert("「セット数」は1以上の数値を設定してください。");
        return false;
    }

    alert('作業を開始します。');

    $(this).prop('disabled', true);
    $(this).css('opacity', '0.5');
    $('#stop').prop('disabled', false);
    $('#stop').css({
        'color': '#1f1f1f',
        'background-color': '#dddddd'
    });

    pomodoro(workTime, breakTime, round, longBreakTime, set);

});

/**
 * 停止ボタン押下時
 */
$('#stop').click( function() {

    if (!confirm('停止しますか？')) {
        return false;
    }

    $(this).prop('disabled', true);
    $(this).css({
        'color': '#cccccc',
        'background-color': '#f5f5f5'
    });

    $('#start').prop('disabled', false);
    $('#start').css({'opacity': '1'});


    clearInterval(interval);

    let workTime = Number($('#work-input').val()) * 60;
    $('#count').text(workTime);
});


/**
 * 開始ボタンにカーソルを合わせたとき
 */
$('#start').hover( function() {
    $(this).css('opacity', '0.5');
}, function () {
    $(this).css('opacity', '1');
});