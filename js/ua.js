/**
 * スマホ用CSSの読み込み処理
 */
// スマホ用CSSのURL
const style_href = "css/style_sp.css";

// ユーザエージェントの取得
let ua = navigator.userAgent;
// スマホの場合はスマホ用CSSを読み込むようにする
if (ua.match(/iPhone|Android.+Mobile/)) {
    document.getElementById('stylesheet').href = style_href;
}