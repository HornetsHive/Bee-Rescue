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
            Your Bee Rescue report has been submitted. You will receieve an email receipt shortly to confirm your submission.<br/><br/>

            Beekeepers in your area will be notified and you will receive an update email when a Beekeeper claims your report.<br/><br/>
          </>
          }
        />
      </Pane>
    </Pane>
  );
}