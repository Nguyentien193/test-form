import React, { useEffect, useState } from "react";
import {
  FormLayout,
  TextField,
  Button,
  Page,
  Grid,
  LegacyCard,
  Select,
  DataTable,
} from "@shopify/polaris";
import { useForm, Controller } from "react-hook-form";
import iconDelete from "../src/icon-delete.svg";
import iconAdd from "../src/icon-add.svg";

const App = () => {
  const [forms, setForms] = useState([
    {
      id: 1,
      titleOption: "Single",
      quantity: 1,
      amount: "",
      subtitle: "Standard prie",
      labelOptinal: "",
      discountType: "",
    },
    {
      id: 2,
      titleOption: "Dou",
      quantity: 2,
      amount: 10,
      subtitle: "Save 10%",
      labelOptinal: "Popular",
      discountType: "10%",
    },
  ]);

  const [rowTable, setRowTable] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    let newRow = [];
    forms.forEach((item) => {
      newRow.push([
        item.titleOption,
        item.discountType,
        item.quantity,
        item.amount,
      ]);
    });
    setRowTable(newRow);
  }, [forms]);

  const onSubmit = (data) => {
    const newData = {
      campaign: data.campaign,
      title: data.title,
      description: data.description,
      options: forms,
    };
    const payload = JSON.stringify(newData);
    fetch("URL_API", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("dataaaaaaaa:", data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const handleAddForm = () => {
    const newForm = {
      id: forms.length > 0 ? forms[forms.length - 1].id + 1 : 0,
      titleOption: "",
      quantity: forms.length > 0 ? forms[forms.length - 1].quantity + 1 : 1,
      amount: "",
      subtitle: "",
      labelOptinal: "",
      discountType: "",
    };
    setForms([...forms, newForm]);
  };

  const handleInputChange = (index, key, value) => {
    console.log("avvaav: ", index, key, value);
    setValue(`${key}[${index}]`, value);
    setForms((prevForms) =>
      prevForms.map((prevForm, idx) =>
        idx === index ? { ...prevForm, [key]: value } : prevForm
      )
    );
  };

  const options = [
    { label: "None", value: "" },
    { label: "10%", value: "10%" },
    { label: "50%", value: "50%" },
  ];

  const handleDeleteOption = (id) => {
    const newForms = forms.filter((item) => item.id !== id);
    setForms(newForms);
  };

  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 7 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LegacyCard title="General" sectioned>
              <FormLayout>
                <Controller
                  name="campaign"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Campaign"
                      {...field}
                      helpText={
                        errors.campaign && (
                          <span style={{ color: "red" }}>
                            Campaign cannot be empty
                          </span>
                        )
                      }
                    />
                  )}
                />

                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Title"
                      {...field}
                      helpText={
                        errors.title && (
                          <span style={{ color: "red" }}>
                            Title cannot be empty
                          </span>
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Description" {...field} />
                  )}
                />
              </FormLayout>
            </LegacyCard>
            <LegacyCard title="Volume discount rule">
              {forms.map((form, index) => (
                <FormLayout key={index}>
                  <div
                    style={{
                      borderTop: "1px solid #cccccc",
                      padding: " 8px 16px 16px",
                      marginTop: "10px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        margin: "10px 0px",
                        textAlign: "right",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteOption(form.id)}
                      >
                        <img
                          src={iconDelete}
                          alt="icon-delete"
                          style={{
                            width: "40xp",
                            height: "40px",
                          }}
                        />
                      </button>
                    </div>
                    <Grid>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                      >
                        <Controller
                          name={`titleOption[${index}]`}
                          control={control}
                          rules={{ required: true }}
                          defaultValue={form.titleOption}
                          render={({ field }) => (
                            <TextField
                              label="Title"
                              {...field}
                              value={form.titleOption}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(index, "titleOption", e);
                              }}
                              helpText={
                                errors?.titleOption &&
                                errors.titleOption[index] && (
                                  <span style={{ color: "red" }}>
                                    Title cannot be empty
                                  </span>
                                )
                              }
                            />
                          )}
                        />
                      </Grid.Cell>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                      >
                        <Controller
                          name={`subtitle[${index}]`}
                          control={control}
                          defaultValue={form.subtitle}
                          render={({ field }) => (
                            <TextField
                              label="Subtitle"
                              {...field}
                              value={form.subtitle}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(index, "subtitle", e);
                              }}
                            />
                          )}
                        />
                      </Grid.Cell>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                      >
                        <Controller
                          name={`labelOptinal[${index}]`}
                          control={control}
                          defaultValue={form.labelOptinal}
                          render={({ field }) => (
                            <TextField
                              label="Label(optinal)"
                              {...field}
                              value={form.labelOptinal}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(index, "labelOptinal", e);
                              }}
                            />
                          )}
                        />
                      </Grid.Cell>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                      >
                        <Controller
                          name={`quantity[${index}]`}
                          control={control}
                          defaultValue={form.quantity}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              label="Quantity"
                              {...field}
                              type="number"
                              value={form.quantity}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(index, "quantity", e);
                              }}
                              helpText={
                                errors?.quantity &&
                                errors.quantity[index] && (
                                  <span style={{ color: "red" }}>
                                    Quantity cannot be empty
                                  </span>
                                )
                              }
                            />
                          )}
                        />
                      </Grid.Cell>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                      >
                        <Controller
                          name={`discountType[${index}]`}
                          control={control}
                          defaultValue={form.discountType}
                          render={({ field }) => (
                            <Select
                              label="Discount type"
                              options={options}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(index, "discountType", e);
                              }}
                              value={form.discountType}
                            />
                          )}
                        />
                      </Grid.Cell>
                      {form.discountType && (
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                        >
                          <Controller
                            name={`amount[${index}]`}
                            control={control}
                            defaultValue={form.quantity}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                label="Amount"
                                {...field}
                                type="number"
                                suffix="%"
                                value={form.amount}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange(index, "amount", e);
                                }}
                                helpText={
                                 (( errors?.amount &&
                                  errors.amount[index]) || !form.amount) && (
                                    <span style={{ color: "red" }}>
                                      Amount cannot be empty
                                    </span>
                                  )
                                }
                              />
                            )}
                          />
                        </Grid.Cell>
                      )}
                    </Grid>

                    <span
                      style={{
                        position: "absolute",
                        backgroundColor: "red",
                        top: 0,
                        left: 0,
                        width: "78px",
                        borderBottomRightRadius: "8px",
                        padding: "4px 8px",
                        color: "white",
                      }}
                    >{`OPTION ${index + 1}`}</span>
                  </div>
                </FormLayout>
              ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "16px",
                  borderTop: "2px solid #cccccc",
                  marginTop: "10px",
                }}
              >
                <Button onClick={handleAddForm} fullWidth>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <img
                      src={iconAdd}
                      alt="icon-add"
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    <p>Add Option</p>
                  </div>
                </Button>
                <Button submit fullWidth>
                  Save
                </Button>
              </div>
            </LegacyCard>
          </form>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 5 }}>
          <LegacyCard title="Preview" sectioned>
            <h3
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
                paddingTop: "20px ",
                paddingBottom: "10px",
              }}
            >
              Buy more and save
            </h3>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Apply for all products in store
            </p>
            <DataTable
              columnContentTypes={["text", "text", "numeric", "numeric"]}
              headings={["Title", "Discount type", "Quantity", "Amount"]}
              rows={rowTable}
            />
          </LegacyCard>
        </Grid.Cell>
      </Grid>
    </Page>
  );
};

export default App;
