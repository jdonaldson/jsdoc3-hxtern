import FB;
class Test {
    static function main() {
        trace("hello world");
        FB.login(function(x){
            trace('hi');
        });
    }
}
