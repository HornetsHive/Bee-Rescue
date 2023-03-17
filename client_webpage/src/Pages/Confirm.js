import { Pane, UnorderedList, ListItem } from 'evergreen-ui';
import InfoCard from '../components/InfoCard';

export default function Confirm(){
  return(
    <Pane flexDirection="row" alignContent="center" display="flex" justifyContent="center">
      <Pane width="50%" flexDirection="column">
        <InfoCard
          heading = "Thank you for submitting your report!"
          text ={
          <>
            Your Bee Rescue report has been submitted. You will receieve an email receipt shortly which will confirm your submission.<br/><br/>

            Beekeepers in your area have been notified and you will receive an update email when a Beekeeper claims your report.<br/><br/>
          </>
          }
        />
      </Pane>
    </Pane>
  );
}