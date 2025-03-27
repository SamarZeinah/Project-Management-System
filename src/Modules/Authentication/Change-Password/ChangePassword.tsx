import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  privateAxiosInstance,
} from "../../../Services/Axiosinstanc";
import { USERS_URLS } from "../../../Services/Urls";
import { toast } from "react-toastify";
import {
  Password_Validation,
  PasswordComfirm_Validation,
} from "../../../Services/Validation";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import useTogglePassword from "../../../hooks/useTogglePassword";

const ChangePassword = () => {
  const navigate = useNavigate();

  interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<ChangePasswordData>({
    mode: "onChange",
  });

  const { visible, toggleVisibility } = useTogglePassword();

  const onSubmit = async (values: ChangePasswordData) => {
    console.log("submit");

    try {
      const { data } = await privateAxiosInstance.post(
        USERS_URLS.UPDATE_USER_PASSWORD,
        values
      );
      toast.success(data?.message);
      navigate("/login");
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

  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  useEffect(() => {
    if (confirmNewPassword) {
    trigger("confirmNewPassword");}
  }, [newPassword, confirmNewPassword, trigger]);

  return (
    <div className=" change-password register">
      <div>
        <span className="text-white">welcome to PMS</span>
        <h3 className="heading">Change Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="mt-3">
          <Row>
            {/* oldPassword */}
            <Form.Group
              as={Col}
              xs={12}
              md={12}
              controlId="formGridCountry"
              className="mb-3"
            >
              <Form.Label>Old Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  {...register("oldPassword", {
                    required: "old password is required",
                  })}
                  type={visible.oldPassword ? "text" : "password"}
                  placeholder="Enter Your Old Password"
                  className="input-register"
                />
                <span
                  className="input-group-text"
                  onClick={() => toggleVisibility("oldPassword")}
                >
                  <i
                    className={
                      visible.oldPassword ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
              {errors?.oldPassword && (
                <p className="text-error mt-2">
                  {errors?.oldPassword?.message}
                </p>
              )}
            </Form.Group>

            {/* password */}
            <Form.Group
              as={Col}
              xs={12}
              md={12}
              controlId="formGridCountry"
              className="mb-3"
            >
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  {...register("newPassword", Password_Validation)}
                  type={visible.password ? "text" : "password"}
                  placeholder="Enter Your New Password"
                  className="input-register"
                />
                <span
                  className="input-group-text"
                  onClick={() => toggleVisibility("password")}
                >
                  <i
                    className={
                      visible.password ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
              {errors?.newPassword && (
                <p className="text-error mt-2">
                  {errors?.newPassword?.message}
                </p>
              )}
            </Form.Group>

            {/* comfirm password */}
            <Form.Group
              as={Col}
              xs={12}
              md={12}
              controlId="formGridCountry"
              className="mb-3"
            >
              <Form.Label>Confirm New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={visible.comfirmPassword ? "text" : "password"}
                  placeholder="Confirm Your New Password"
                  className="input-register"
                  {...register("confirmNewPassword", {...PasswordComfirm_Validation,
                    validate: (value: string) =>
                      value === watch("newPassword") || "passwords dont match",
                  })}
                />
                <span
                  className="input-group-text"
                  onClick={() => toggleVisibility("comfirmpassword")}
                >
                  <i
                    className={
                      visible.comfirmPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-error mt-2">
                  {errors?.confirmNewPassword?.message}
                </p>
              )}
            </Form.Group>
          </Row>
          <div className="w-75 mx-auto">
            <Button
              disabled={isSubmitting}
              className="save-btn w-100 mt-4 rounded-pill"
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
        </Container>
      </form>
    </div>
  );
};

export default ChangePassword;
