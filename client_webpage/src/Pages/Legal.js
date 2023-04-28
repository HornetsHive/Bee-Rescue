import { Pane } from 'evergreen-ui';

export default function Legal(){

  const isMobile = /Mobile/.test(window.navigator.userAgent);

  return(
    <Pane flexDirection="row" alignContent="center" display="flex" justifyContent="center">
      <Pane width={isMobile ? "90%" : "50%"} flexDirection="column" backgroundColor="#FFFFFF" margin="24px" marginTop="16px" padding="24px" borderRadius="1em" elevation="1">
        <h1>Terms and Conditions for Bee Rescue App Reporters</h1>
          <h3>Introduction</h3>
            <p>These Terms and Conditions ("Terms") govern the use of the Bee Rescue app ("App") by reporters, who are individuals reporting bee-related issues on their property, seeking assistance from beekeepers registered with the Sacramento Area Beekeeper's Association (SABA). By using the App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the App.</p>
          <h3>Purpose of the App</h3>
            <p>The Bee Rescue app is designed to facilitate communication between reporters and registered beekeepers for the purpose of addressing bee-related issues on the reporter's property. The App is a platform that connects the reporter to the beekeeper and is not responsible for the actions or services provided by the beekeeper.</p>
          <h3>No Employment Relationship</h3>
            <p>The registered beekeepers who may respond to reports submitted through the App are not employees, contractors, or agents of SABA or Bee Rescue. They are independent individuals who have voluntarily signed up to be notified of bee-related issues reported through the App.</p>
          <h3>No Binding Contract</h3>
            <p>By submitting a report through the App, you acknowledge that you are not entering into a binding contract with SABA, Bee Rescue, or any beekeeper. The App merely facilitates communication between you and the beekeeper, and it is up to you and the beekeeper to agree on the terms and conditions of any services provided.</p>
          <h3>Liability Waiver</h3>
            <p>You agree that neither SABA nor Bee Rescue shall be liable for any actions, inactions, or consequences resulting from your use of the App or any interactions with registered beekeepers. This includes, but is not limited to, any property damage, personal injury, or financial loss that may occur during the course of any bee-related services provided by the beekeeper.</p>
          <h3>Indemnification</h3>
            <p>You agree to indemnify, defend, and hold harmless SABA, Bee Rescue, and their respective officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your use of the App, your interactions with any beekeeper, or the services provided by any beekeeper.</p>
          <h3>Governing Law</h3>
            <p>These Terms and any disputes arising out of or related to these Terms or your use of the App shall be governed by the laws of the State of California, without regard to its conflicts of law principles.</p>
          <h3>Changes to Terms</h3>
            <p>SABA and Bee Rescue reserve the right to modify these Terms at any time. Your continued use of the App following any changes to the Terms constitutes your acceptance of those changes.</p>
          <h3>Contact Information</h3>
            <p>If you have any questions or concerns about these Terms, please contact the Sacramento Beekeeper's Association at https://sacbeekeepers.org/contact</p>
      </Pane>
    </Pane>
  );
}