import netscape.javascript.JSObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
@WebServlet("/PublishArticals")
public class PublishArticals extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String[] inf={"id","username","title","content","date"};
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        for(int i=0;i<inf.length;i++)
            inf[i]=req.getParameter(inf[i]);
        Connection conn=ConnectToDatabase.connnectToDatabase();
        Statement st=null;
        try{
            int id;
            st=conn.createStatement();
            if(inf[0].equals("no")){
                System.out.println("进入发布文章");
                ResultSet rs=st.executeQuery("select * from id order by id limit 1");
                if(rs.next()) {
                    id=Integer.parseInt(rs.getString(1));
                    st.executeUpdate("delete from id where id='"+id+"'");
                }else{
                    rs = st.executeQuery("select id from artical order by id desc limit 1");
                    if(rs.next()) id=Integer.parseInt(rs.getString(1))+1;
                    else id=1;
                }
                inf[0]=Integer.toString(id);
                String str="";
                for(int i=0;i<inf.length;i++){
                    if(i==inf.length) str+=inf[i];
                    else str+=inf[i]+",";
                }
                str=StringTransfer.stringTransfer(str);
                System.out.println(str);
                st.executeUpdate("insert into artical values("+str+")");
                rs.close();
                resp.getWriter().write("success");
            }else{
                id=Integer.parseInt(inf[0]);
                String str="";
                for(int i=0;i<inf.length;i++){
                    if(i==inf.length) str+=inf[i];
                    else str+=inf[i]+",";
                }
                System.out.println(str);
                str=StringTransfer.stringTransfer(str);
                st.executeUpdate("delete from artical where id="+id);
                st.executeUpdate("insert into artical value("+str+")");
                resp.getWriter().write("success");
            }
            st.close();
            conn.close();
        }catch (Exception e){
            System.out.println("处理出错");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
