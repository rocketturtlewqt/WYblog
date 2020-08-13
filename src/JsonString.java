import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;

public class JsonString {
    private static ArrayList<String> user=new ArrayList<String>(Arrays.asList("username","sex","name","birth","company","position","degree","school","industry","introduction"));
    static ArrayList<String> artical = new ArrayList<String>(Arrays.asList("id","username","title","content","time"));
    public JsonString() {
    }
    public static String toUser (ArrayList<String> inputUser) {
        int i;
        String[] jsonUser = new String[10];
        jsonUser[0] = "{"+"\""+user.get(0)+"\""+":"+"\""+inputUser.get(0)+"\""+",";
        for (i=1 ; i<inputUser.size()-1;i++){
            jsonUser[i] = "\""+user.get(i)+"\""+":"+"\""+inputUser.get(i)+"\""+",";
        }
        jsonUser[i] = "\""+user.get(9)+"\""+":"+"\""+inputUser.get(9)+"\""+"}";
        String json="";
        for (int j=0;j<jsonUser.length;j++){
            json = json+jsonUser[j];
        }
        return json;
    }
    public static  String toArtical (ArrayList<String> inputArtical){
        int i;
        String[] jsonArtical = new String[5];
        jsonArtical[0] = "{"+"\""+artical.get(0)+"\""+":"+"\""+inputArtical.get(0)+"\""+",";
        for ( i =1;i<inputArtical.size()-1;i++){
            jsonArtical[i] = "\""+artical.get(i)+"\""+":"+"\""+inputArtical.get(i)+"\""+",";
        }
        jsonArtical[i] = "\""+artical.get(4)+"\""+":"+"\""+inputArtical.get(4)+"\""+"}";
        String json = "";
        for(int j=0;j<jsonArtical.length;j++){
            json = json+jsonArtical[j];
        }
        return  json;
    }
    public static String toArticalList(ArrayList<String> inputArticalList){
        String json="";
        String temStr=null;
        ArrayList<String> temList = new ArrayList<String>(Arrays.asList("null","null","null","null","null"));
        int listSize = inputArticalList.size();
        int circleNum = listSize/5;
        for (int i=0;i<circleNum;i++){
            for (int j=0;j<5;j++){
                temList.set(j,inputArticalList.get(5*i+j));
                temStr = toArtical(temList);
            }
            json = json+temStr+";";
        }
        json = json.substring(0,json.length()-1);
        return json;
    }
    public static void main(String[] args) {
        ArrayList<String> input = new ArrayList<String>(Arrays.asList("13023765257","male","王勤涛",	"2020-07-08","阿里","工程师","本科","浙江科技学院" ,"互联网","10年"));
        String output = toUser(input);
        System.out.println(output);
        ArrayList<String> art = new ArrayList<String>(Arrays.asList("1","name","title","content","time"));
        String outArt = toArtical(art);
        System.out.println(outArt);
        ArrayList<String> artList = new ArrayList<String>(Arrays.asList("1","name","title","content","time","2","name","title","content","time","3","name","title","content","time"));
        String outArtList = toArticalList(artList);
        System.out.println(outArtList);
    }
}
