<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Employee Registration</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Employee Registration Details</h1>
                <table>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Salary</th>
                        <th>Status</th>
                    </tr>
                    <xsl:for-each select="EmployeeRegistration/Employee">
                        <tr>
                            <td><xsl:value-of select="EmployeeID"/></td>
                            <td><xsl:value-of select="FirstName"/></td>
                            <td><xsl:value-of select="LastName"/></td>
                            <td><xsl:value-of select="DateOfBirth"/></td>
                            <td><xsl:value-of select="Gender"/></td>
                            <td><xsl:value-of select="Email"/></td>
                            <td><xsl:value-of select="Phone"/></td>
                            <td>
                                <xsl:value-of select="Address/Street"/>, 
                                <xsl:value-of select="Address/City"/>, 
                                <xsl:value-of select="Address/State"/> 
                                <xsl:value-of select="Address/ZipCode"/>
                            </td>
                            <td><xsl:value-of select="Position"/></td>
                            <td><xsl:value-of select="Department"/></td>
                            <td><xsl:value-of select="DateOfJoining"/></td>
                            <td><xsl:value-of select="Salary"/></td>
                            <td><xsl:value-of select="Status"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>