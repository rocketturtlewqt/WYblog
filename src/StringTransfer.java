import java.util.ArrayList;
import java.util.Arrays;

public class StringTransfer {
    public static String stringTransfer(String str){
        String[] s=str.split(",");
        for(int i=0;i<s.length;i++){
            if(s[i].equals("null")) continue;
            else s[i]="'"+s[i]+"'";
        }
        return String.join(",",s);
    }
}
