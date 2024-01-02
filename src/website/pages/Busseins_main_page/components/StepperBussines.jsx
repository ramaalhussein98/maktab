import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const gradientBackground = (colors) =>
  `linear-gradient( 136deg, ${colors.join(", ")})`;

const CustomStepConnector = styled(StepConnector)(
  ({ theme, active, completed }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: gradientBackground([
          "rgb(242,113,33) 0%",
          "rgb(233,64,87) 50%",
          "rgb(138,35,135) 100%",
        ]),
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  })
);

const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#c20000",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: gradientBackground([
      "rgb(242,113,33) 0%",
      "rgb(233,64,87) 50%",
      "rgb(138,35,135) 100%",
    ]),
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: gradientBackground([
      "rgb(242,113,33) 0%",
      "rgb(233,64,87) 50%",
      "rgb(138,35,135) 100%",
    ]),
  }),
}));

const CustomStepIconWrapper = ({ children, ...props }) => (
  <CustomStepIcon ownerState={props}>{children}</CustomStepIcon>
);

CustomStepIconWrapper.propTypes = {
  children: PropTypes.node,
};

const CustomStepIconComponent = ({ active, completed, icon }) => (
  <CustomStepIconWrapper ownerState={{ completed, active }}>
    {icon}
  </CustomStepIconWrapper>
);

CustomStepIconComponent.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const StepperBussines = () => {
  const steps = ["step 1", "step 2", "step 3", "step 4"];

  return (
    <Stack
      sx={{ width: "100%", direction: "ltr", marginY: "2rem" }}
      spacing={4}
    >
      <Stepper
        alternativeLabel
        activeStep={3}
        connector={<CustomStepConnector />}
      >
        {steps?.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIconComponent {...props} icon={getIcon(index + 1)} />
              )}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

const getIcon = (index) => {
  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <GroupAddIcon />,
  };
  return icons[index];
};

export default StepperBussines;
