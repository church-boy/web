from lxml import etree
xml_file = "students.xml"
xslt_file = "students.xsl"

xml_tree = etree.parse(xml_file)
xslt_tree = etree.parse(xslt_file)

transform = etree.XSLT(xslt_tree)
html_tree = transform(xml_tree)
html_output = str(html_tree)
print(html_output)
with open("students.html","w") as f:
    f.write(html_output)