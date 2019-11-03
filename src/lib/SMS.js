import aws from 'aws-sdk';

aws.config.update({ region: 'us-east-2' });

class SMS {
  sendSMS(phoneNumber, message, subject) {
    const params = {
      Message: message,
      PhoneNumber: `+${phoneNumber}`,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: subject,
        },
      },
    };

    const publishTextPromise = new aws.SNS({ apiVersion: '2010-03-31' })
      .publish(params)
      .promise();

    return publishTextPromise;
  }

  formatCellphone(cellphone) {
    const [, number] = cellphone.split('+');
    const countryCode = number.substring(0, 2);
    const DDD = number.substring(4, 6);
    const [, last10Digits] = number.split(') ');
    const [before5Digits, last4Digits] = last10Digits.split('-');
    const next4Digits = before5Digits.substring(1, 5);

    const numberFormatted = `${countryCode}${DDD}${next4Digits}${last4Digits}`;

    return numberFormatted;
  }
}

export default new SMS();
