export async function loading() {
    let fonts = document.fonts;
    await fonts.load('10px "jf-dot-mplus10-subset"');
    console.log("font");

    let loading = document.getElementById('loading');
    loading.classList.add('hide');
}
