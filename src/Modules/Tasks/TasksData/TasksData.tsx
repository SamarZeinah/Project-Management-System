import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { privateAxiosInstance } from "../../../Services/Axiosinstanc";
import { TASKS_URLS } from "../../../Services/Urls";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  UserSelector} from '../../Shared/Interfaces/UserInterface'
import { TaskData } from "../../Shared/Interfaces/TaskInterface";
import{ProjectSelector}  from "../../Shared/Interfaces/projectInterface";

import { UsersContext } from "../../../context/UsersContext";
import { ProjectsContext } from "../../../context/ProjectsContext";

export default function TasksData() {
  const { users } = useContext(UsersContext) ;
  const { projects } = useContext(ProjectsContext);

  

  const navigate = useNavigate();



  const addNewTask = async (values: TaskData) => {
    try {
      const { data } = await privateAxiosInstance.post(
        TASKS_URLS.CREATE_TASK,
        values
      );
      toast.success(data?.message);
      navigate("/dashboard/tasks");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something Went Wrong");
      } else if (error instanceof Error) {
        toast.error(error.message || "Something Went Wrong");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  const editTask = async (values: TaskData) => {
    try {
      const { data } = await privateAxiosInstance.put(
        TASKS_URLS.UPDATE_TASK(Number(id)),
        values
      );
      toast.success(data?.message);
      navigate("/dashboard/tasks");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something Went Wrong");
      } else if (error instanceof Error) {
        toast.error(error.message || "Something Went Wrong");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  const onSubmit = async (values: TaskData) => {
    if (id) {
      editTask(values);
    } else {
      addNewTask(values);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskData>({
    mode: "onChange",
  });

  const { id } = useParams<{ id: string }>();

  let getTask = async () => {
    try {
      let response = await privateAxiosInstance.get(
        TASKS_URLS.UPDATE_TASK(id)
      );

      setValue("title", response?.data?.title);
      setValue("description", response?.data?.description);
      setValue("employeeId", response?.data?.employee?.id);
      setValue("projectId", response?.data?.project?.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTask();
    }
  }, [id]);

  return (
    <div className="add-task">
      <div className="title-task d-flex justify-content-between align-items-center ">
        <div className="left-div">
          <Link to={"/dashboard/tasks"}>
            
            <i className="fa-solid fa-arrow-left"></i> View All Tasks
          </Link>
          <h1>{id ? "Edit" : "Add a New"}Task</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="task-form  ">
        <Row>
          {/* Title */}
          <Form.Group
            as={Col}
            xs={12}
            md={12}
            controlId="formGridCountry"
            className="mb-3"
          >
            <Form.Label>Title</Form.Label>
            <div className="input-group">
              <Form.Control
                {...register("title")}
                placeholder="Name"
                className="input-register"
                type="text"
              />
            </div>
            {errors?.title && (
              <p className="text-error mt-2">{errors?.title?.message}</p>
            )}
          </Form.Group>

          {/* description */}
          <Form.Group
            as={Col}
            xs={12}
            md={12}
            controlId="formGridCountry"
            className="mb-3"
          >
            <Form.Label>Description</Form.Label>
            <div className="input-group">
              <Form.Control
                {...register("description")}
                type="text"
                placeholder="Description"
                className="input-register pb-5"
              />
            </div>
            {errors?.description && (
              <p className="text-error mt-2">{errors?.description?.message}</p>
            )}
          </Form.Group>
          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="select-div">
              {/* User */}
              <Form.Label>Employee</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="data-input"
                {...register("employeeId", {
                  required: "employee is required",
                })}
              >
                <option value="">Select a User</option>
                {users.map((item: UserSelector) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.userName}
                  </option>
                ))}
              </Form.Select>

              {errors.employeeId && (
                <span className="text-danger">{errors.employeeId.message}</span>
              )}
            </div>

            {/* User */}

            {id ? null : (
              <div className="select-div">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="data-input"
                  {...register("projectId", {
                    required: "project is required",
                  })}
                >
                  <option value="">Select a Project</option>
                  {projects.map((item: ProjectSelector) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.title}
                    </option>
                  ))}
                </Form.Select>

                {errors.projectId && (
                  <span className="text-danger">
                    {errors.projectId.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </Row>

        <div className="w-100 buttons-div d-flex flex-column flex-sm-row gap-4 gap-sm-0">
          <Button
            disabled={isSubmitting}
            className="cancel-btn px-4 rounded-pill"
            type="button"
            onClick={() => {
              navigate("/dashboard/tasks");
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            className="save-btn px-4 rounded-pill "
            type="submit"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                <span>Saving...</span>
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
