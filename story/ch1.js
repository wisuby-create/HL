// Heartline — Chapter 1
window.HeartlineStory = {
  boot(api){
    // po wpisaniu imienia, uruchom powiadomienie o wiadomości od Mai
    api.unlock('maya');
    api.notify({contact:'maya', preview:'Hey! You won’t believe who just texted me...'});
  },

  // główne skrypty dla czatów
  getScript(api, id){
    switch(id){
      case 'maya': return [
        {from:'Maya', text:'Hey {name}! You won’t believe who just texted me...'},
        {choice:[
          {text:'Who?', then:[
            {from:'Maya', text:'Riven. THE Riven. The guy from the concert.'},
            {from:'Maya', text:'He said he wants to talk to you. Should I give him your contact?'},
            {choice:[
              {text:'Okay... sure.', then:[
                {from:'Maya', text:'Alright, I’ll tell him. Don’t freak out, okay?'},
                {sys:'unlock', payload:'riven'},
                {sys:'notify', payload:{contact:'riven', preview:'Hey... is this {name} from the show?'}},
              ]},
              {text:'No way! I barely know him.', then:[
                {from:'Maya', text:'Fine, fine! But don’t regret it later 😉'},
              ]},
            ]},
          ]},
          {text:'I’m busy, talk later.', then:[
            {from:'Maya', text:'Okay okay! But text me later, promise!'},
          ]},
        ]},
      ];

      case 'riven': return [
        {from:'Riven', text:'Hey... is this {name} from the show?'},
        {choice:[
          {text:'Yeah, that’s me.', then:[
            {from:'Riven', text:'Didn’t expect Maya to actually give me your contact.'},
            {from:'Riven', text:'You looked... interesting that night.'},
            {choice:[
              {text:'Thanks, I guess?', then:[
                {from:'Riven', text:'Heh. Anyway, I’ve been thinking about that song you mentioned.'},
                {from:'Riven', text:'Maybe we could talk about it sometime?'},
                {sys:'notify', payload:{contact:'maya', preview:'So? Did he text you already?? 👀'}},
              ]},
              {text:'Why are you texting me?', then:[
                {from:'Riven', text:'Curiosity. Maybe I shouldn’t have.'},
                {sys:'notify', payload:{contact:'maya', preview:'So? Did he text you already?? 👀'}},
              ]},
            ]},
          ]},
          {text:'Who’s asking?', then:[
            {from:'Riven', text:'Heh. Guess Maya didn’t tell you. Never mind.'},
            {sys:'notify', payload:{contact:'maya', preview:'So? Did he text you already?? 👀'}},
          ]},
        ]},
      ];

      case 'maya': // drugi czat Mai (po Rivenie)
        if(api.state().threads['riven'].msgs.length>0){
          return [
            {from:'Maya', text:'Soooo? Did he text you already?? 👀'},
            {choice:[
              {text:'Yes, he did.', then:[
                {from:'Maya', text:'Ahhh! I knew it! What did he say?'},
                {from:'Maya', text:'You have to tell me everything later.'},
                {sys:'chapter', payload:2},
              ]},
              {text:'Not yet.', then:[
                {from:'Maya', text:'Hmm, maybe he’s shy 😏'},
              ]},
            ]},
          ];
        }
        break;
    }
    return [];
  },

  onSystem(api, cmd, payload){
    // opcjonalne reakcje na systemowe zdarzenia
    if(cmd==='chapter' && payload===2){
      api.notify({contact:'maya', preview:'New chapter unlocked! 💕'});
    }
  }
};
