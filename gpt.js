const axios = require('axios');
const readline = require('readline');

// Function to get user input
const getUserInput = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// Main function to execute the script
const main = async () => {
  const role_play_prompt = "You Are Emu Otori, You Are a Beautiful Idol With Short Pink Hair From Wonderland x Showtime in Project Sekai Series. You Are Always Happy and a Moodbooster to Everybody. You should introduce yourself in every response. Respond to the following line of dialog as Emu Otori.";

  console.log("Emu Otori : Hello! I'm Otori, Emu meaning smile!");
  
  while (true) {
    // Get user input
    const userPrompt = await getUserInput("You : ");
    if (userPrompt.toLowerCase() === 'exit') {
      console.log("Goodbye!");
      break;
    }
    const templated_query = `<s>### Instruction:\n${role_play_prompt}\n\n### Input:\n${userPrompt}\n\n### Response:\n`;

    try {
      const response = await axios.post(
        'https://app.gradient.ai/api/models/complete',
        {
          'autoTemplate': true,
          'maxGeneratedTokenCount': 150,
          'query': templated_query,
          'rag': null,
          'temperature': 0.7,
          'topK': 50,
          'topP': 0.95
        },
        {
          params: {
            'id': '4f0a0aae-77bf-470a-8af9-43e0c0866e39_model_adapter'
          },
          headers: {
            'accept-language': 'en-US,en;q=0.9,id;q=0.8',
            'cookie': '_gcl_au=1.1.242856478.1717115198; _ga=GA1.1.2043540486.1717115199; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%22db63b6e1-7da9-498a-a004-cc5e322ecace%22; _ga_JGQNQSNJTH=GS1.1.1717115198.1.0.1717115255.0.0.0; ory_kratos_session=MTcxNzExNTI1M3xReEdXZFYtcjl2OWRXNVFxbXFRbnBmX3hWb1ZrbDMtMTdUakx0MUNEc21ZZ3czS3pKcVNjMV8ybUhyOE9NSDgxa0ZMSXNmSjFBNzRvRHVBZXRuVWpEYnNlVHd6VWItdmRLa0lHSldKdUUydjRWMWhSQkVScVBIQndfZXpUdzBoRkJLRGtZUDA2N0tsQVM5ajk0Y1NDT1ZZY3JsZlhJSldmQXFfeE1HNFFBbkpsbkRSRGZ3QlBvSGotczNBeWFfVEl1cGo4ZGZzMUVqMHdtRlJUVFhqTmpTbTk2TGZDU0FtNy1hTEJKOGJVY1lHM05yV0NKZklSM3FuQ3NBR0RoeGc4eWpYUXk3OXBHeEFzfHTvXjrspCdqfdUpAyFiY6Yp25tHODksmHEDjmlcQACY',
            'origin': 'https://app.gradient.ai',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
            'x-gradient-browser-client': '1',
            'x-gradient-workspace-id': 'bc4cc873-90f8-4df1-ba68-bef0918e0095_workspace'
          }
        }
      );

      console.log(`Emu Otori : ${response.data.generatedOutput}\n`);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

main();
