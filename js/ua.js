const style_href = "css/style_sp.css";

let ua = navigator.userAgent;
if (ua.match(/iPhone|Android.+Mobile/)) {
    document.getElementById('stylesheet').href = style_href;
}