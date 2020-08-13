import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@MultipartConfig
@WebServlet("/PortraitServlet")
public class PortraitServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Part filePart = req.getPart("headerImg");
        String filename = filePart.getSubmittedFileName();
        String realPath = this.getServletContext().getRealPath("/avatorImg");
        filePart.write(realPath + "/" + filename);
        PrintWriter out=resp.getWriter();
        out.write("success");
    }
}
