<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Library Book List</title>
                <style>
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .expensive {
                        background-color: #ffe6e6;
                    }
                </style>
            </head>
            <body>
                <h2>Books with Price Between 200 and 300</h2>
                <table>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Available</th>
                    </tr>
                    <xsl:for-each select="library/book[price > 200 and price &lt; 300]">
                        <tr>
                            <td><xsl:value-of select="bookId"/></td>
                            <td><xsl:value-of select="title"/></td>
                            <td><xsl:value-of select="author"/></td>
                            <td><xsl:value-of select="genre"/></td>
                            <td><xsl:value-of select="publishYear"/></td>
                            <td><xsl:value-of select="price"/></td>
                            <td><xsl:value-of select="available"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
