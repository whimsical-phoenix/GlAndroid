/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.sendCallNotification = functions.firestore
  .document('calls/{callId}')
  .onCreate(async (snapshot, context) => {
    const callData = snapshot.data();

    const notification: admin.messaging.MessagingPayload = {
      notification: {
        title: 'Incoming Call',
        body: `${callData.callerName} is calling.`,
      },
      data: {
        callId: context.params.callId,
      },
    };

    try {
      await admin.messaging().sendToDevice(callData.calleeFCMToken, notification);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  });
