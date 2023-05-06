import { Pane } from 'evergreen-ui';
import InfoCard from '../components/InfoCard';

export default function Confirm(){
  const isMobile = /Mobile/.test(window.navigator.userAgent);

  return(
    <Pane flexDirection="row" alignContent="center" display="flex" justifyContent="center">
      <Pane width={isMobile ? "90%" : "50%"} flexDirection="column">
        <InfoCard
          heading = "Your report has been confirmed"
          text ={
          <>
            Beekeepers in your area will be notified and you will receive an update email when a Beekeeper claims your report.<br/>
          </>
          }
        />
      </Pane>
    </Pane>
  );
}