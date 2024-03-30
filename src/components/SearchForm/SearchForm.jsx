import { Field, Formik, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchForm.module.css";

export default function SeachForm({ onSearch }) {
  const hundleSubmit = (values) => {
    if (values.search === "") {
      toast.error("Enter the data in the field");
    }
    console.log("values: ", values);

    onSearch(values.search);
  };
  return (
    <>
      <Formik initialValues={{ search: "" }} onSubmit={hundleSubmit}>
        <Form className={css.form}>
          <label>
            <Field
              className={css.field}
              type="text"
              name="search"
              placeholder="search"
            />
          </label>
          <Toaster position="top-right" reverseOrder={false} />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </>
  );
}
