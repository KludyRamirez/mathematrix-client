import React, { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  fetchAllQuestions,
} from "../store/actions/questionActions";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

const Questions = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    question: "",
    category: "",
    options: [],
    correctAnswer: "",
  });
  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);

  const { questions, error, loading } = useSelector((state) => state.question);

  useEffect(() => {
    const handleFetchAllQuestions = () => {
      try {
        dispatch(fetchAllQuestions());
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    handleFetchAllQuestions();
  }, [dispatch]);

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "question":
        if (!value.trim()) errorMsg = "Question is required";
        else if (value.length < 10)
          errorMsg = "Question must be at least 10 characters";
        else if (value.length > 100)
          errorMsg = "Question cannot exceed 100 characters";
        break;

      case "category":
        if (!value) errorMsg = "Category is required";
        else if (value.length < 3)
          errorMsg = "Category must be at least 3 characters";
        else if (value.length > 100)
          errorMsg = "Category cannot exceed 100 characters";
        break;

      case "options":
        if (!value) errorMsg = "Options is required";
        else if (value.length < 1) errorMsg = "Options must be at least 1";
        else if (value.length > 4) errorMsg = "Options cannot exceed 4";
        break;

      case "correctAnswer":
        if (!value) errorMsg = "Correct answer is required";
        else if (value.length < 3)
          errorMsg = "Correct answer must be at least 3 characters";
        else if (value.length > 100)
          errorMsg = "Correct answer cannot exceed 100 characters";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;

    // Ensure value is an array (MUI Select already provides an array)
    const selectedValues = Array.isArray(value) ? value : [value];

    // Update form state
    setFormValues((prev) => ({
      ...prev,
      [name]: selectedValues,
    }));

    // Validate field after updating
    validateField(name, selectedValues);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formValues).forEach((field) => {
      const error = validateField(field, formValues[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { question, category, options, correctAnswer } = formValues;
      dispatch(addQuestion(question, category, options, correctAnswer));
    }
  };

  // add question dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-[calc(100%-240px)] h-[100vh]">
      <div className="w-full h-full flex flex-col justify-start items-start gap-12">
        <div className="w-full flex justify-start items-center gap-3 px-10 py-4 text-gray-900 shadow-md">
          <span className="text-[18px] mt-1 tracking-wide font-[extra-light]">
            Admin | Questions
          </span>
        </div>
        <div className="w-full h-full px-10">
          <div className="w-full h-full flex flex-col bg-blue-100/20 rounded-tl-[12px] rounded-tr-[12px]">
            {/* Filters */}
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between items-center border-b-[2px] border-white">
                <div className="w-[calc(100%-108px)] font-[extra-light] px-4 pt-4 pb-2">
                  Filters
                </div>
                <div className="w-[100px] h-[50px] bg-white flex justify-end items-center">
                  <button
                    className="w-full h-full bg-blue-600 rounded-[4px] text-white"
                    onClick={handleOpen}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-start items center gap-8">
                <div className="w-[190px] flex flex-col gap-3 p-4">
                  {/* <div className="font-[extra-light]">Question</div>
                  <select className="w-full px-3 h-[40px] appearance-none focus:outline-none border-[1px] border-gray-300 focus:border-gray-400 rounded-[4px] font-[extra-light]">
                    <option>kludy</option>
                  </select> */}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="w-full h-[620px] bg-[#f9f9f9] rounded-tl-[12px] rounded-tr-[12px] overflow-auto">
              <div className="w-full h-[60px] flex justify-start items-center bg-white">
                {/* <div className="flex justify-start items-center px-6">
                  <input type="checkbox" className="w-[18px] h-[18px]" />
                </div> */}
                <div className="w-[500px] flex justify-center items-center text-gray-900">
                  Question
                </div>
                <div className="w-[500px] flex justify-center items-center text-gray-900">
                  Options
                </div>
                <div className="w-[300px] flex justify-center items-center text-gray-900">
                  Correct Answer
                </div>
              </div>
              {questions?.map((q, index) => (
                <div
                  key={index}
                  className="w-full h-[60px] flex justify-start items-center bg-white border-b"
                >
                  <div className="w-[500px] flex justify-center items-center text-gray-700">
                    {q.question}
                  </div>
                  <div className="w-[500px] flex justify-center items-center text-gray-700">
                    {q.options.join(", ")}
                  </div>
                  <div className="w-[300px] flex justify-center items-center text-green-700 font-semibold">
                    {q.correctAnswer}
                  </div>
                </div>
              ))}
            </div>

            {/* Add question dialog */}
            <Dialog onClose={handleClose} open={open}>
              <DialogTitle>Add a question ++</DialogTitle>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="flex justify-center flex-col items-start gap-4">
                  <input
                    name="question"
                    className="w-[320px] md:w-[400px] h-[56px] border-[1px] border-[#282828] px-4 focus:outline-none focus:border-blue-700 font-[extra-light]"
                    placeholder="Enter your question"
                    value={formValues.question}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.question && (
                    <span className="text-red-500 text-[14px]">
                      {errors.question}
                    </span>
                  )}
                </div>
                <div className="spacer-small"></div>
                <div className="flex justify-center flex-col items-start gap-4">
                  <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      className="w-[320px] md:w-[400px] h-[56px]"
                      label="category"
                      value={formValues.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem key="Identification" value="Identification">
                        Identification
                      </MenuItem>
                      <MenuItem key="Solving" value="Solving">
                        Solving
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {errors.category && (
                    <span className="text-red-500 text-[14px]">
                      {errors.category}
                    </span>
                  )}
                </div>
                <div className="spacer-small"></div>
                <div className="flex justify-center flex-col items-start gap-4">
                  <FormControl>
                    <InputLabel>Options</InputLabel>
                    <Select
                      multiple
                      name="options"
                      className="w-[320px] md:w-[400px] h-[56px]"
                      label="Options"
                      value={formValues.options}
                      onChange={handleMultiSelectChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem key="Inequality" value="Rational Inequality">
                        Rational Inequality
                      </MenuItem>
                      <MenuItem key="Function" value="Rational Function">
                        Rational Function
                      </MenuItem>
                      <MenuItem key="Equation" value="Rational Equation">
                        Rational Equation
                      </MenuItem>
                      <MenuItem key="None" value="None of the above">
                        None of the above
                      </MenuItem>
                    </Select>
                  </FormControl>

                  {errors.options && (
                    <span className="text-red-500 text-[14px]">
                      {errors.options}
                    </span>
                  )}
                </div>
                <div className="spacer-small"></div>
                <div className="flex justify-center flex-col items-start gap-4">
                  <input
                    name="correctAnswer"
                    className="w-[320px] md:w-[400px] h-[56px] border-[1px] border-[#282828] px-4 focus:outline-none focus:border-blue-700 font-[extra-light]"
                    placeholder="Enter correct answer"
                    value={formValues.correctAnswer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.correctAnswer && (
                    <span className="text-red-500 text-[14px]">
                      {errors.correctAnswer}
                    </span>
                  )}
                </div>
                <div className="spacer-xs"></div>
                <div className="spacer-small"></div>
                <button
                  type="submit"
                  className={`cursor-pointer py-[1rem] w-[320px] md:w-[400px] ${
                    Object.values(errors).some((err) => err !== "") ||
                    !formValues.question ||
                    !formValues.category
                      ? "border-[1px] border-gray-300 bg-gray-300 text-white"
                      : "footer-btn"
                  } `}
                  disabled={
                    Object.values(errors).some((err) => err !== "") ||
                    !formValues.question ||
                    !formValues.category ||
                    !formValues.options ||
                    !formValues.correctAnswer
                  }
                >
                  Add
                </button>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
