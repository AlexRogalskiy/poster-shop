import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@material-ui/core";
import numeral from "numeral";
import {
    BooleanField,
    CardContentInner,
    DateField,
    FunctionField,
    Labeled,
    NumberField,
    ReferenceField,
    ShowView,
    TextField,
    useRecordContext,
} from "react-admin";
import { OrderItems } from "./OrderItems";

export const OrdersShowLayout = (props) => {
    const { record } = useRecordContext();
    return (
        <ShowView
            title={`Order #${record.id}`}
            hasEdit={false}
            hasCreate={false}
            hasList={false}
            hasShow={false}
        >
            <CardContentInner>
                <Grid container xs={12} sm={12} md={8} spacing="3">
                    <Grid item xs={12} sm={12} md={8}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6}>
                                <Labeled source="date">
                                    <DateField
                                        record={record}
                                        label="Date"
                                        source="date"
                                    />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Labeled source="reference">
                                    <TextField
                                        record={record}
                                        source="reference"
                                    ></TextField>
                                </Labeled>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6}>
                                <Labeled source="status">
                                    <TextField
                                        record={record}
                                        source="status"
                                    />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Labeled source="returned">
                                    <BooleanField
                                        record={record}
                                        source="returned"
                                        valueLabelTrue="returned"
                                    />
                                </Labeled>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} spacing="3">
                        <Typography>Customer</Typography>
                        <ReferenceField
                            record={record}
                            label="Customer"
                            source="customer_id"
                            reference="customers"
                            sortBy="last_name"
                            link="show"
                            {...props}
                        >
                            <FunctionField
                                resource="customers"
                                label="Name"
                                render={(record) =>
                                    `${record.first_name} ${record.last_name}`
                                }
                            />
                        </ReferenceField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} spacing="3">
                        <Typography>Items</Typography>
                        <OrderItems record={record} {...props} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} spacing="3">
                        <Typography>Totals</Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="items">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Sum</TableCell>
                                        <TableCell align="right">
                                            <NumberField
                                                record={record}
                                                source="total_ex_taxes"
                                                options={{
                                                    style: "currency",
                                                    currency: "USD",
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Delivery</TableCell>
                                        <TableCell align="right">
                                            <NumberField
                                                record={record}
                                                source="delivery_fees"
                                                options={{
                                                    style: "currency",
                                                    currency: "USD",
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Tax(
                                            {record
                                                ? numeral(
                                                      record.tax_rate
                                                  ).format("0%")
                                                : ""}
                                            )
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumberField
                                                record={record}
                                                source="taxes"
                                                options={{
                                                    style: "currency",
                                                    currency: "USD",
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Total
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumberField
                                                style={{ fontWeight: "bold" }}
                                                record={record}
                                                source="total"
                                                options={{
                                                    style: "currency",
                                                    currency: "USD",
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </CardContentInner>
        </ShowView>
    );
};
