export const MISSED_ASSIGNMENTS = "MISSED ASSIGNMENTS";
export const BEEN_ABSENT_FROM_CLASS = "BEEN ABSENT FROM CLASS";
export const BEEN_LATE_TO_CLASS = "BEEN LATE TO CLASS";
export const A_CONCERNING_GRADE = "A CONCERNING GRADE";
//-----------tones----------------------------------------------
export const PROFESSIONAL = 'Professional';
export const SUPPORTIVE = 'Supportive';
export const UPBEAT = 'Upbeat';
//----------selection---------------------------------------------
export const HOLD_A_JOB = 'also holds a job';
export const CARETAKER = 'also is a caretaker';
export const RECENT_ILLNESS = 'had an illness recently';
export const RECENT_TRAVEL = 'Was travelling recently'
export const TOOK_TIME_OFF = 'Recently took time off';
//-----------Prompt 1------------------------------------------------------
export const PROMPT_ONE_MISSED_ASSIGNMENTS = (question) =>
    `Write an email to a learner who is not turning in their assignments. 
Include the following instructions to the student: ${question}. 
Keep it under 3 paragraphs. Do not use the phrase 
"I hope this email finds you well.". And write what the subject is on top of email`
export const PROMPT_ONE_BEEN_ABSENT_FROM_CLASS = (question) =>
    `Write an email to an adult learner who has been absent from class. 
Include the following instructions to the student: ${question}.  
Write as the student's advisor. Keep it under 3 paragraphs. 
Do not use the phrase "I hope this email finds you well.". And write what the subject is on top of email`
export const PROMPT_ONE_BEEN_LATE_TO_CLASS = (question) =>
    `Write an email to an adult learner who has been late to class. 
Include the following instructions to the student: ${question}.  
Write as the student's advisor. Keep it under 3 paragraphs. 
Do not use the phrase "I hope this email finds you well.". And write what the subject is on top of email`
export const PROMPT_ONE_A_CONCERNING_GRADE = (question) =>
    `Write an email to an adult learner who has been a concerning grade. 
Include the following instructions to the student: ${question}.  
Write as the student's advisor. Keep it under 3 paragraphs. 
Do not use the phrase "I hope this email finds you well.". And write what the subject is on top of email`
//----------------------------------------------------------------------------
export const PROMPT_ONE = (question1, question2) => {
    if (question1.toUpperCase() === MISSED_ASSIGNMENTS) return PROMPT_ONE_MISSED_ASSIGNMENTS(question2);
    else if (question1.toUpperCase() === BEEN_ABSENT_FROM_CLASS) return PROMPT_ONE_BEEN_ABSENT_FROM_CLASS(question2);
    else if (question1.toUpperCase() === BEEN_LATE_TO_CLASS) return PROMPT_ONE_BEEN_LATE_TO_CLASS(question2);
    else if (question1.toUpperCase() === A_CONCERNING_GRADE) return PROMPT_ONE_A_CONCERNING_GRADE(question2);
}
//------------------------------------------------------------------------------
export const PROMPT_TWO = (draft, beforePrompt, tone) => {
    return `"${draft}"\n This email is created by the prompt "${beforePrompt}".
     Rewrite about above email in a more ${tone} tone. And Don't remove the subject. `
}
//--------------------------------------------------------------------------------
export const PROMPT_THREE = (draft, beforePrompt, selection) => {
    let prompt = `${draft}\n This email is created by the prompt "${beforePrompt}". Update the above email by knowing information such 
    as "${selection}" about the learner. And Don't remove the subject.`;
    return prompt;
}
//--------------------------------------------------------------------------------
export const PROMPT_FOUR = (draft, beforePrompt) => {
    return `"${draft}"\n This email is created by the prompt "${beforePrompt}". 
    Now give me three version of above email varying by tone, length and level of detail.
    Separate each email by inserting a "$" at the end of the email.
    And Don't remove the subject.
    Never use words that are not related to  email.
    example: version, version number
    `;
}