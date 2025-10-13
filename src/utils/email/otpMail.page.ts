export const otpMailPage = async (otp: string) => {
    
    return `
    <style>
    body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: rgb(230, 158, 70);
    }

    .container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);
    justify-content: center;
    align-items: flex-end;
    }

    p {
        font-size: 24px;
        padding: 10px;
        
        text-align: center;
    }
    </style>

    <div class="container">
    <p>Your otp is <span style="color: orange; font-size: 24px; font-weight: bold;">${otp}</span></p>
    </div>
    `;
}
