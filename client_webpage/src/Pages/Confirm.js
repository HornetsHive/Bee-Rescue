import { Pane } from 'evergreen-ui';
import InfoCard from '../components/InfoCard';

export default function Confirm(){
  const isMobile = /Mobile/.test(window.navigator.userAgent);

  return(
    <Pane flexDirection="row" alignContent="center" display="flex" justifyContent="center">
      <Pane width={isMobile ? "90%" : "50%"} flexDirection="column">
        <InfoCard
          heading = "Thank you for submitting your report!"
          text ={
          <>
            Your Bee Rescue report has been submitted.<br/><br/> You will receieve an email receipt shortly to confirm your submission.<br/><br/> <b>Please check your spam folder</b>
          </>
          }
        />
      </Pane>
    </Pane>
  );
}