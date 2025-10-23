import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * 发票PDF生成器
 * 
 * 使用OpenHTMLtoPDF和Freemarker生成发票PDF
 * 支持从HTML模板生成PDF，确保与预览效果100%一致
 */
public class InvoicePDFGenerator {
    
    private Configuration freemarkerConfig;
    
    public InvoicePDFGenerator() {
        // 初始化Freemarker配置
        freemarkerConfig = new Configuration(Configuration.VERSION_2_3_32);
        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/");
        freemarkerConfig.setDefaultEncoding("UTF-8");
    }
    
    /**
     * 从HTML模板生成PDF
     * 
     * @param htmlTemplate HTML模板内容
     * @param outputPath 输出PDF文件路径
     * @throws Exception 生成失败时抛出异常
     */
    public void generatePDFFromHtml(String htmlTemplate, String outputPath) throws Exception {
        try (FileOutputStream os = new FileOutputStream(outputPath)) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            
            // 设置HTML内容
            builder.withHtmlContent(htmlTemplate, null);
            
            // 设置输出流
            builder.toStream(os);
            
            // 启用快速模式
            builder.useFastMode();
            
            // 执行渲染
            builder.run();
            
            System.out.println("✅ PDF生成成功: " + outputPath);
        }
    }
    
    /**
     * 从Freemarker模板生成PDF
     * 
     * @param templatePath Freemarker模板文件路径
     * @param dataModel 数据模型
     * @param outputPath 输出PDF文件路径
     * @throws Exception 生成失败时抛出异常
     */
    public void generatePDFFromTemplate(String templatePath, Map<String, Object> dataModel, String outputPath) throws Exception {
        // 使用Freemarker处理模板
        Template template = freemarkerConfig.getTemplate(templatePath);
        
        StringWriter htmlWriter = new StringWriter();
        template.process(dataModel, htmlWriter);
        String htmlContent = htmlWriter.toString();
        
        // 生成PDF
        generatePDFFromHtml(htmlContent, outputPath);
    }
    
    /**
     * 创建示例数据模型
     */
    public static Map<String, Object> createSampleDataModel() {
        Map<String, Object> dataModel = new HashMap<>();
        
        // Header数据
        Map<String, Object> header = new HashMap<>();
        header.put("title", "Invoice #INV-001");
        header.put("description", "Professional Services Invoice");
        header.put("logo", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==");
        dataModel.put("header", header);
        
        // Info数据
        Map<String, Object> info = new HashMap<>();
        info.put("sectionTitle", "Client Information");
        Map<String, Object>[] items = new Map[7];
        for (int i = 0; i < 7; i++) {
            items[i] = new HashMap<>();
            items[i].put("label", "Field " + (i + 1));
            items[i].put("value", "Value " + (i + 1));
        }
        info.put("items", items);
        dataModel.put("info", info);
        
        // Table数据
        Map<String, Object>[] tables = new Map[1];
        tables[0] = new HashMap<>();
        tables[0].put("sectionTitle", "Services");
        tables[0].put("subsectionTitle", "Service Details");
        tables[0].put("total", 350.00);
        tables[0].put("rowsNumber", 2);
        
        // 列定义
        Map<String, Object>[] columns = new Map[4];
        columns[0] = new HashMap<>();
        columns[0].put("id", "item");
        columns[0].put("name", "Item");
        columns[0].put("alignment", "left");
        
        columns[1] = new HashMap<>();
        columns[1].put("id", "price");
        columns[1].put("name", "Price");
        columns[1].put("alignment", "right");
        
        columns[2] = new HashMap<>();
        columns[2].put("id", "quantity");
        columns[2].put("name", "Quantity");
        columns[2].put("alignment", "right");
        
        columns[3] = new HashMap<>();
        columns[3].put("id", "total");
        columns[3].put("name", "Total");
        columns[3].put("alignment", "right");
        
        tables[0].put("columns", columns);
        
        // 行数据
        Map<String, Object>[] rows = new Map[2];
        rows[0] = new HashMap<>();
        rows[0].put("data", Map.of(
            "item", "Web Development",
            "price", "$100.00",
            "quantity", "2",
            "total", "$200.00"
        ));
        
        rows[1] = new HashMap<>();
        rows[1].put("data", Map.of(
            "item", "Consulting",
            "price", "$150.00",
            "quantity", "1",
            "total", "$150.00"
        ));
        
        tables[0].put("rows", rows);
        dataModel.put("tables", tables);
        
        // Description数据
        Map<String, Object> description = new HashMap<>();
        description.put("content", "This invoice covers professional services including web development and consulting services provided during the billing period.");
        dataModel.put("description", description);
        
        // Item数据
        Map<String, Object> item = new HashMap<>();
        item.put("sectionTitle", "Additional Information");
        Map<String, Object>[] itemItems = new Map[5];
        for (int i = 0; i < 5; i++) {
            itemItems[i] = new HashMap<>();
            itemItems[i].put("label", "Info " + (i + 1));
            itemItems[i].put("value", "Detail " + (i + 1));
        }
        item.put("items", itemItems);
        dataModel.put("item", item);
        
        // Footer数据
        Map<String, Object> footer = new HashMap<>();
        footer.put("info", "Thank you for your business!");
        footer.put("name", "Your Company Name");
        dataModel.put("footer", footer);
        
        return dataModel;
    }
    
    /**
     * 主方法 - 演示如何使用
     */
    public static void main(String[] args) {
        try {
            InvoicePDFGenerator generator = new InvoicePDFGenerator();
            
            // 方法1: 直接从HTML文件生成PDF
            System.out.println("🚀 方法1: 从HTML文件生成PDF");
            String htmlContent = new String(Files.readAllBytes(Paths.get("test-openhtmltopdf-compatible.html")));
            generator.generatePDFFromHtml(htmlContent, "output-direct.html");
            
            // 方法2: 从Freemarker模板生成PDF
            System.out.println("🚀 方法2: 从Freemarker模板生成PDF");
            Map<String, Object> dataModel = createSampleDataModel();
            generator.generatePDFFromTemplate("invoice-template.ftl", dataModel, "output-template.pdf");
            
            System.out.println("🎉 所有PDF生成完成！");
            
        } catch (Exception e) {
            System.err.println("❌ 生成失败: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * 验证HTML兼容性
     */
    public static boolean validateHtmlCompatibility(String htmlContent) {
        System.out.println("🔍 验证HTML兼容性...");
        
        boolean isValid = true;
        
        // 检查DOCTYPE
        if (!htmlContent.contains("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"")) {
            System.out.println("❌ DOCTYPE不正确");
            isValid = false;
        }
        
        // 检查meta标签
        if (!htmlContent.contains("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />")) {
            System.out.println("❌ Meta标签不正确");
            isValid = false;
        }
        
        // 检查不兼容的CSS属性
        String[] incompatibleProperties = {
            "display: table", "display: flex", "display: grid",
            "transform:", "box-shadow:", "position: absolute"
        };
        
        for (String property : incompatibleProperties) {
            if (htmlContent.contains(property)) {
                System.out.println("❌ 发现不兼容的CSS属性: " + property);
                isValid = false;
            }
        }
        
        if (isValid) {
            System.out.println("✅ HTML兼容性验证通过！");
        }
        
        return isValid;
    }
}
