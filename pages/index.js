import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import { Fragment, useEffect, useState } from "react";

const DUMMY_MEETSUP = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    address: "Some adress 5,12345 Some City",
    description: "This is the first meetup",
  },
  {
    id: "m2",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    address: "Some adress 5,12345 Some City",
    description: "This is the first meetup",
  },
  {
    id: "m3",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    address: "Some adress 5,12345 Some City",
    description: "This is the first meetup",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETSUP);
  // }, []);
  //return <MeetupList meetups={loadedMeetups}></MeetupList>;
  return (
    <Fragment>
      <Head>
        <title>React Meetups v2.0</title>
        <meta
          name="description"
          content="Browse a huge list of higly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

// you can return a promese
// export async function getStaticProps() {
//   // fetch data from an API or Database only server side.
//   return {
//     props: {
//       meetups: DUMMY_MEETSUP,
//     },
//     revalidate: 3600, // every hour
//   };
// }

// run on the server after deployment
export async function getServerSideProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://jhmarin3:6njprxmS3c1AmTrb@cluster0.ohsxvpv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  const req = context.req;
  const res = context.res;
  // Fetch data from an API
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;
