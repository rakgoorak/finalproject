import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import fontPdf from './Sarabun.ttf';
import userImage from './user.jpg';

Font.register({ family: 'Sarabun', src: fontPdf });


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        fontFamily: 'Sarabun'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    title1: {
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    table: {
        marginTop: 10,
        borderStyle: 'collapse',
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        padding: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        textAlign: 'center',
        flex: 1,
    },
    totalRow: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    totalCell: {
        padding: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        textAlign: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: '150px',
        height: '150px',
    },
    infoContainer: {
        flex: 1,
    },
    dataContainer: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    netAmountRow: {

    },

});


const Receipt = ({ order, name, address, phoneNumber }) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} src={userImage} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>หจก. เจ.เอส เพาว์เวอร์ อีเลคทริค (สำนักงานใหญ่)</Text>
                            <Text style={styles.title}>J.S POWER ELECTRIC LTD.PART</Text>
                            <Text style={styles.title1}>53/24 ม.2 ต.ไร่ขิง อ.สามพราน จ.นครปฐม 73210</Text>
                            <Text style={styles.title1}>โทรศัพท์ 034-318334, 089-221733, 086-1606142 แฟ็กซ์ 034-318335</Text>
                            <Text style={styles.title1}>Email : jspower.etc@gmail.com</Text>
                        </View>
                    </View>

                    <View style={styles.dataContainer}>
                        <Text>วันที่ : {new Date().toLocaleDateString()}</Text>
                        <Text>ชื่อลูกค้า : {name && name.name}</Text>
                        <Text>ที่อยู่ : {address && address.fulladdress && address.fulladdress.houseNumber} ต.{address && address.fulladdress && address.fulladdress.subdistrict} อ.{address && address.fulladdress && address.fulladdress.district} จ.{address && address.fulladdress && address.fulladdress.province} {address && address.fulladdress && address.fulladdress.zipcode}</Text>
                        <Text>โทรศัพท์ : {phoneNumber && phoneNumber.phoneNumber}</Text>
                    </View>

                    {/* Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>ลำดับ</Text>
                            <Text style={styles.tableCell}>ชื่อสินค้า</Text>
                            <Text style={styles.tableCell}>จำนวน</Text>
                            <Text style={styles.tableCell}>ราคา/หน่วย</Text>
                            <Text style={styles.tableCell}>จำนวนเงิน</Text>
                        </View>

                        {/* Table Body */}
                        {order.products.map((product, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{product.name}</Text>
                                <Text style={styles.tableCell}>{product.count}</Text>
                                <Text style={styles.tableCell}>{product.price}</Text>
                                <Text style={styles.tableCell}>{product.count * product.price}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Total Price */}
                    <View style={styles.totalRow}>
                        <Text style={{ textAlign: 'right' }}>รวม/Total : {order.cartTotal}</Text>
                        <Text style={{ textAlign: 'right' }}>ภาษีมูลค่าเพิ่ม/VAT 7% : {(order.cartTotal * 0.07).toFixed(2)}</Text>
                        <Text style={{ textAlign: 'right' }}>สุทธิ Net amount : {(order.cartTotal * 1.07).toFixed(2)}</Text>
                    </View>
                </View>
            </Page>
        </Document >
    );
};

export default Receipt;

