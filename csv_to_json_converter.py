#!/usr/bin/env python3
"""
Script to convert team members CSV to JSON format for React component
"""

import csv
import json
import os

def convert_csv_to_json(csv_file_path, json_output_path):
    """
    Convert CSV file to JSON format for team members
    
    Expected CSV columns:
    - name: Team member name
    - position: Position/role
    - image: Image path (optional)
    - email: Email address (optional)
    - linkedin: LinkedIn URL (optional) 
    - instagram: Instagram URL (optional)
    """
    
    team_members = []
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
            # Try to detect delimiter
            sample = csvfile.read(1024)
            csvfile.seek(0)
            sniffer = csv.Sniffer()
            delimiter = sniffer.sniff(sample).delimiter
            
            reader = csv.DictReader(csvfile, delimiter=delimiter)
            
            for row in reader:
                # Skip empty rows
                if not row.get('name', '').strip():
                    continue
                    
                member = {
                    "name": row.get('name', '').strip(),
                    "position": row.get('position', '').strip(),
                    "image": row.get('image', '').strip() or f"/img/team/{row.get('name', '').lower().replace(' ', '_')}.jpg"
                }
                
                # Build social object only if there are social links
                social = {}
                
                email = row.get('email', '').strip()
                if email:
                    social['email'] = email
                
                linkedin = row.get('linkedin', '').strip()
                if linkedin:
                    # Ensure LinkedIn URL is properly formatted
                    if linkedin and not linkedin.startswith('http'):
                        linkedin = f"https://{linkedin}"
                    social['linkedin'] = linkedin
                
                instagram = row.get('instagram', '').strip()
                if instagram:
                    # Ensure Instagram URL is properly formatted
                    if instagram and not instagram.startswith('http'):
                        instagram = f"https://{instagram}"
                    social['instagram'] = instagram
                
                facebook = row.get('facebook', '').strip()
                if facebook:
                    # Ensure Facebook URL is properly formatted
                    if facebook and not facebook.startswith('http'):
                        facebook = f"https://{facebook}"
                    social['facebook'] = facebook
                
                # Only add social object if it has content
                if social:
                    member['social'] = social
                
                team_members.append(member)
        
        # Write JSON file
        with open(json_output_path, 'w', encoding='utf-8') as jsonfile:
            json.dump(team_members, jsonfile, indent=2, ensure_ascii=False)
        
        print(f"✅ Successfully converted {len(team_members)} team members")
        print(f"📁 CSV input: {csv_file_path}")
        print(f"📄 JSON output: {json_output_path}")
        
        return team_members
        
    except FileNotFoundError:
        print(f"❌ Error: CSV file not found: {csv_file_path}")
        return None
    except Exception as e:
        print(f"❌ Error converting CSV to JSON: {str(e)}")
        return None

def main():
    # Default file paths
    csv_file = "/home/prashant/Documents/mathsoc-site/html/events.csv"  # Adjust this path
    json_file = "/home/prashant/Documents/mathsoc-site/html/mathsoc-react/src/data/teamMembers.json"
    
    print("🔄 Converting CSV to JSON...")
    print(f"Looking for CSV file: {csv_file}")
    
    # Check if CSV file exists
    if not os.path.exists(csv_file):
        print(f"❌ CSV file not found at: {csv_file}")
        print("📝 Please update the csv_file path in the script or provide the correct path")
        
        # Try to find CSV files in the current directory
        current_dir_csvs = [f for f in os.listdir('.') if f.endswith('.csv')]
        if current_dir_csvs:
            print(f"🔍 Found CSV files in current directory: {current_dir_csvs}")
        return
    
    # Convert CSV to JSON
    result = convert_csv_to_json(csv_file, json_file)
    
    if result:
        print(f"\n📊 Preview of first team member:")
        print(json.dumps(result[0], indent=2))
        print(f"\n✨ Conversion complete! Updated {json_file}")
    else:
        print("❌ Conversion failed")

if __name__ == "__main__":
    main()