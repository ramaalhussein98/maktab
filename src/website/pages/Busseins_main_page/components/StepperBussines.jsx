import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import PaidIcon from "@mui/icons-material/Paid";
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
      "rgb(255, 241, 233) 0%",
      "rgb(118, 103, 105) 50%",
      "rgb(138,35,135) 100%",
    ]),
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: gradientBackground([
      "rgb(255, 241, 233) 0%",
      "rgb(118, 103, 105) 50%",
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
  const steps = [
    " إضف بيانات الوحدة",
    " أضف السعر والشروط",
    " وحدتك تنعرض أكثر من 500 ألف مستأجر",
    " تأكد أن الوحدة جاهزة لإيجار",
    "ستصلك رسالة بكل طلب إيجار",
    "أنشاء عقد بينك وبين المستأجر",
    "نقوم تحويل مستحقاتك",
  ];

  return (
    <Stack
      sx={{ width: "100%", direction: "ltr", marginY: "2rem" }}
      spacing={4}
    >
      <Stepper
        alternativeLabel
        activeStep={6}
        connector={<CustomStepConnector />}
        // sx={{ width: "100%", overflow: "auto" }}
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
    1: <AddCircleOutlineIcon />,
    2: <VideoLabelIcon />,
    3: <SlideshowIcon />,
    4: <CheckCircleOutlineIcon />,
    5: <EmailIcon />,
    6: <ContentPasteGoIcon />,
    7: <PaidIcon />,
  };
  return icons[index];
};

export default StepperBussines;
