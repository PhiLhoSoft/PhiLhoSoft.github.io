(() =>
{
	document.addEventListener("DOMContentLoaded", (event) =>
	{
		const participantListTA = document.getElementById('ParticipantList');
		const resultDiv = document.getElementById('Result');
		const sortButton = document.getElementById('Sort');
		const shuffleButton = document.getElementById('Shuffle');
		const generateButton = document.getElementById('Generate');
		//console.log("Tournoi", sortButton, shuffleButton, generateButton);
		sortButton.addEventListener('click', () =>
		{
			//console.log("Participants", participantListTA.value);
			let participantList = participantListTA.value.trim().split('\n');
			participantList = participantList.sort();
			participantListTA.value = participantList.join('\n');
		});
		shuffleButton.addEventListener('click', () =>
		{
			let participantList = participantListTA.value.trim().split('\n');
			participantList = participantList.sort((a, b) =>
			{
				let rnd = Math.random();
				if (rnd < 0.5) return -1;
				return 1;
			});
			participantListTA.value = participantList.join('\n');
		});
		generateButton.addEventListener('click', () =>
		{
			const participantList = participantListTA.value.trim().split('\n');
			const participantNumber = participantList.length;
			let groupNumber = 1;
			while (participantNumber / groupNumber > 2)
			{
				groupNumber *= 2;
			}
			if (groupNumber * 2 !== participantNumber)
			{
				groupNumber /= 2;
			}
			let groups = [];
			for (let i = 0; i < groupNumber; i++)
			{
				groups[i] = [];
				groups[i][0] = participantList.pop();
				groups[i][1] = participantList.pop();
			}
			while (participantList.length > 0)
			{
				let i = 0;
				while (participantList.length > 0 && i < groups.length)
				{
					groups[i++].push(participantList.pop());
				}
			}
			console.log("Participants", participantNumber, groupNumber, groups);
			let listing = `<h2>Participants au tournoi (${participantNumber})</h2>\n`;
			for (let i = 0; i < groupNumber; i++)
			{
				listing += `<h3>Groupe ${i + 1}</h3>\n<ul>\n`;
				for (let j = 0; j < groups[i].length; j++)
				{
					listing += `<li>${groups[i][j]}</li>\n`;

				}
				listing += `</ul>\n`;
			}
			resultDiv.innerHTML = listing;
		});
	});
})();
