import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * OpenHTMLtoPDF 兼容性测试
 * 
 * 使用方法：
 * 1. 确保已添加OpenHTMLtoPDF依赖到项目中
 * 2. 将test-openhtmltopdf-compatible.html放在resources目录下
 * 3. 运行此测试类
 * 
 * Maven依赖：
 * <dependency>
 *     <groupId>com.openhtmltopdf</groupId>
 *     <artifactId>openhtmltopdf-pdfbox</artifactId>
 *     <version>1.0.10</version>
 * </dependency>
 */
public class OpenHTMLtoPDFTest {
    
    public static void main(String[] args) {
        try {
            // 读取HTML文件
            String htmlContent = readHtmlFile("test-openhtmltopdf-compatible.html");
            
            // 生成PDF
            generatePDF(htmlContent, "output-test.pdf");
            
            System.out.println("✅ PDF生成成功！文件保存为: output-test.pdf");
            System.out.println("✅ OpenHTMLtoPDF兼容性测试通过！");
            
        } catch (Exception e) {
            System.err.println("❌ 测试失败: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * 读取HTML文件内容
     */
    private static String readHtmlFile(String filename) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filename)));
    }
    
    /**
     * 使用OpenHTMLtoPDF生成PDF
     */
    private static void generatePDF(String htmlContent, String outputPath) throws Exception {
        try (FileOutputStream os = new FileOutputStream(outputPath)) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            
            // 设置HTML内容
            builder.withHtmlContent(htmlContent, null);
            
            // 设置输出流
            builder.toStream(os);
            
            // 启用快速模式（可选）
            builder.useFastMode();
            
            // 执行渲染
            builder.run();
        }
    }
    
    /**
     * 验证HTML兼容性的辅助方法
     */
    public static void validateHtmlCompatibility(String htmlContent) {
        System.out.println("🔍 验证HTML兼容性...");
        
        // 检查DOCTYPE
        if (htmlContent.contains("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"")) {
            System.out.println("✅ DOCTYPE正确");
        } else {
            System.out.println("❌ DOCTYPE不正确");
        }
        
        // 检查meta标签
        if (htmlContent.contains("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />")) {
            System.out.println("✅ Meta标签正确");
        } else {
            System.out.println("❌ Meta标签不正确");
        }
        
        // 检查样式标签
        if (htmlContent.contains("<style type=\"text/css\">")) {
            System.out.println("✅ 样式标签正确");
        } else {
            System.out.println("❌ 样式标签不正确");
        }
        
        // 检查不兼容的CSS属性
        String[] incompatibleProperties = {
            "display: table",
            "display: flex",
            "display: grid",
            "transform:",
            "box-shadow:",
            "position: absolute"
        };
        
        boolean hasIncompatibleProperties = false;
        for (String property : incompatibleProperties) {
            if (htmlContent.contains(property)) {
                System.out.println("❌ 发现不兼容的CSS属性: " + property);
                hasIncompatibleProperties = true;
            }
        }
        
        if (!hasIncompatibleProperties) {
            System.out.println("✅ 未发现不兼容的CSS属性");
        }
        
        // 检查表格结构
        if (htmlContent.contains("<table") && htmlContent.contains("</table>")) {
            System.out.println("✅ 表格结构正确");
        } else {
            System.out.println("❌ 表格结构不正确");
        }
        
        System.out.println("🎉 HTML兼容性验证完成！");
    }
}
