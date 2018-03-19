import fetch from 'node-fetch';

export interface IEmail {
    message: string;
    token: string;
    emails: string[];
    subject: string;
}

export const getCurrentYear = (): number => {
    const date = new Date();
    return date.getFullYear();
};
export const getShortURL = async (longUrl: string): Promise<string> => {
    // TODO: add access token to sever env virables
    const apiToken = '43c76f9ad7b4a259615aba8f682b55493477e467';
    const apiUrl = `https://api-ssl.bitly.com/v3/shorten?access_token=${apiToken}`;
    const response = await fetch(`${apiUrl}&longUrl=${longUrl}`);
    const json = await response.json();
    return json.data.url;
};
export const sendEmail = (payload: IEmail): Promise<any> => {
    return fetch('http://data.devinit.org:9999/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    });
};
