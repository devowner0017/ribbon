export const convertDraftToHtmlType = (draft) => {
    var converted = draft.replace(/Subject:/i, "<b>Subject:</b>").replace('\n\n', "<br /><br />")
    return converted;
}